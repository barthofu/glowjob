import { ReservationWithUser } from '@cinestia/contract'
import { PrismaService, ReservationCreateOneSchema, ReservationUpdateOneSchema } from '@cinestia/prisma'
import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { createPaginator } from 'prisma-pagination'
import { z } from 'zod'
import { MailingService } from '../../core/services/mailing.service'
import { PaymentService } from '../../core/services/payment.service'
import { ScreeningService } from '../screening/screening.service'
import { UserService } from '../user/user.service'
import { config } from '../../config'
import { dayjs } from '@cinestia/utils'

@Injectable()
export class ReservationService {
	constructor(
		private readonly paymentService: PaymentService,
		private readonly screeningService: ScreeningService,
		private readonly prisma: PrismaService,
		private readonly userService: UserService,
		private readonly mailingService: MailingService
	) {}

	// CRUD

	async getReservations(page: number, perPage: number, screeningId?: number) {
		const paginate = createPaginator({ perPage })

		return paginate<z.infer<typeof ReservationWithUser>, Prisma.ReservationFindManyArgs>(
			this.prisma.reservation,
			{
				where: { screeningId },
				include: {
					user: true,
				},
			},
			{
				page,
			}
		)
	}

	async getReservation(id: number, isCheckoutId?: boolean) {
		const reservation = await this.prisma.reservation.findUnique({
			where: {
				[isCheckoutId ? 'checkoutId' : 'id']: id,
			},
		})
		if (!reservation) throw new NotFoundException('Reservation not found')

		return reservation
	}

	async createReservation({ data }: z.infer<typeof ReservationCreateOneSchema>) {
		return this.prisma.reservation.create({ data })
	}

	async updateReservation(
		id: number,
		{ data }: Pick<z.infer<typeof ReservationUpdateOneSchema>, 'data'>,
		isCheckoutId?: boolean
	) {
		return this.prisma.reservation.update({ where: { [isCheckoutId ? 'checkoutId' : 'id']: id }, data })
	}

	// Custom

	/**
	 * Initialize the reservation process
	 */
	async initReservation(screeningId: number, userId: number, amount: number) {
		const checkout = await this.createReservationCheckout(screeningId, amount, config.seatPrice) // TODO: variabalize price

		// Prevently book seats, will be undone if payment fails
		await this.screeningService.bookSeats(screeningId, amount)

		// Create the reservation in the database
		return this.createReservation({
			data: {
				user: {
					connect: {
						id: userId,
					},
				},
				screening: {
					connect: {
						id: screeningId,
					},
				},
				status: 'PENDING',
				checkoutId: checkout.id,
				checkoutUrl: checkout.url!,
				amount: amount,
				price: amount * config.seatPrice,
			},
		})
	}

	/**
	 * Create a checkout session for a reservation
	 */
	async createReservationCheckout(screeningId: number, amount: number, price: number) {
		const screening = await this.prisma.screening.findUnique({
			where: { id: screeningId },
			include: {
				movie: {
					include: {
						poster: true,
					},
				},
			},
		})
		if (!screening) throw new NotFoundException('Screening not found')

		return this.paymentService.createCheckout(
			{
				name: screening.movie.title,
				description: 'Billet',
				images: screening.movie.poster ? [screening.movie.poster.url] : undefined,
			},
			amount,
			price
		)
	}

	/**
	 * Validate a reservation after a successful payment
	 */
	async validateReservation(checkoutId: string) {
		// Set the reservation status as paid
		return this.prisma.reservation
			.update({
				where: { checkoutId },
				data: {
					status: 'PAID',
				},
				include: {
					screening: {
						include: {
							movie: {
								include: {
									poster: true,
								},
							},
						},
					},
					user: true,
				},
			})
			.then((reservation) => {
				const movie = reservation.screening.movie
				const screening = reservation.screening

				// Send mail
				const subject = `Réservation Cinestia : ${movie.title} (${dayjs(screening.startTime).format(
					'DD/MM/YYYY à HH:MM'
				)})`
				const textToSend =
					'This is an email confirmation of payment and booking for the ' +
					screening.startTime +
					' screening of the movie : ' +
					movie.title +
					'\n\nPlease do not reply'

				const htmlBody = `
				<table style="width: 100%; border-collapse: collapse;">
					<tr>
						<td style="background-color: #222; color: #fff; padding: 20px;">
							<h1>Confirmation de réservation de séance</h1>
						</td>
					</tr>
					<tr>
						<td style="padding: 20px;">
							<p>Merci d'avoir réservé chez Cinestia. Votre réservation a été confirmée avec succès.</p>
							<h2>Détails de la réservation :</h2>
							<div style="display: flex; align-items: center;">
								<img src="${
									movie.poster?.url
								}" alt="Affiche du film" style="width: 150px; height: auto; margin-right: 20px; border-radius: 5px;">
								<ul>
									<li><strong>Nom du film :</strong> ${movie.title} </li>
									<li><strong>Date et heure :</strong> ${dayjs(reservation.screening.startTime).format('DD/MM/YYYY à HH:MM')}</li>
									<li><strong>Salle :</strong> ${reservation.screening.room}</li>
									<li><strong>Nombre de billets :</strong> ${reservation.amount}</li>
									<li><strong>Prix :</strong> ${reservation.price / 100}€</li>
								</ul>
							</div>
							<p>Veuillez présenter cette confirmation lors de votre arrivée au cinéma. Nous sommes impatients de vous accueillir !</p>
						</td>
					</tr>
					<tr>
						<td style="background-color: #222; color: #fff; padding: 20px; text-align: center;">
							<p>Merci de choisir notre cinéma. Pour plus d'informations, visitez notre site Web : <a href="http://localhost:3000">Cinestia</a></p>
						</td>
					</tr>
				</table>`

				const mgclient = this.mailingService.createMgClient()
				this.mailingService.sendSuccessMail(mgclient, reservation.user.email, subject, textToSend, htmlBody)

				return reservation
			})
			.catch((e) => {
				throw new NotFoundException('Reservation not found')
			})
	}

	/**
	 * Cancel a reservation after a failed payment
	 */
	async cancelReservation(checkoutId: string) {
		const reservation = await this.prisma.reservation.findUnique({
			where: { checkoutId },
		})
		if (!reservation) throw new NotFoundException('Reservation not found')

		await this.prisma.reservation.update({
			where: { checkoutId },
			data: {
				status: 'CANCELED',
			},
		})

		await this.screeningService.cancelSeats(reservation.screeningId, reservation.amount)

		return reservation
	}
}
