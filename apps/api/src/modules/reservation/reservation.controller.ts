import { contract } from '@cinestia/contract'
import { Controller, Req, UseGuards } from '@nestjs/common'
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest'
import { ReservationService } from './reservation.service'
import { Role, Roles, JwtGuard } from '@cinestia/api/auth'

@Controller()
export class ReservationController {
	constructor(private readonly reservationService: ReservationService) {}

	// ========================================
	// CRUD
	// ========================================

	@TsRestHandler(contract.reservations.getReservations)
	@Roles(Role.Admin)
	@UseGuards(JwtGuard)
	async getReservations() {
		return tsRestHandler(contract.reservations.getReservations, async ({ query }) => {
			const screeningId = query.screeningId ? Number(query.screeningId) : undefined
			const reservations = await this.reservationService.getReservations(
				Number(query.page),
				Number(query.perPage),
				screeningId
			)

			return {
				status: 200,
				body: reservations,
			}
		})
	}

	@TsRestHandler(contract.reservations.getReservation)
	@Roles(Role.Admin)
	@UseGuards(JwtGuard)
	async getReservation() {
		return tsRestHandler(contract.reservations.getReservation, async ({ params }) => {
			const reservation = await this.reservationService.getReservation(Number(params.id))

			return {
				status: 200,
				body: reservation,
			}
		})
	}

	@TsRestHandler(contract.reservations.createReservation)
	@Roles(Role.User)
	@UseGuards(JwtGuard)
	async createReservation(@Req() req: any) {
		return tsRestHandler(contract.reservations.createReservation, async ({ body }) => {
			const reservation = await this.reservationService.initReservation(
				body.screeningId,
				req.user.id,
				body.amount
			)

			return {
				status: 201,
				body: reservation,
			}
		})
	}

	// ========================================
	// Custom
	// ========================================

	@TsRestHandler(contract.reservations.validateReservation)
	@Roles(Role.User)
	@UseGuards(JwtGuard)
	async validateReservation() {
		return tsRestHandler(contract.reservations.validateReservation, async ({ body }) => {
			const reservation = await this.reservationService.validateReservation(body.checkoutId)

			return {
				status: 200,
				body: reservation,
			}
		})
	}

	@TsRestHandler(contract.reservations.cancelReservation)
	@Roles(Role.User)
	@UseGuards(JwtGuard)
	async cancelReservation() {
		return tsRestHandler(contract.reservations.cancelReservation, async ({ body }) => {
			const reservation = await this.reservationService.cancelReservation(body.checkoutId)

			return {
				status: 200,
				body: reservation,
			}
		})
	}
}
