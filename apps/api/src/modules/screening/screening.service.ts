import { PrismaService, ScreeningCreateOneSchema, ScreeningUpdateOneSchema } from '@cinestia/prisma'
import { dayjs } from '@cinestia/utils'
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { Screening } from '@prisma/client'
import { z } from 'zod'

@Injectable()
export class ScreeningService {
	constructor(private prisma: PrismaService) {}

	async getScreening(id: number) {
		return this.prisma.screening.findUnique({
			where: { id },
		})
	}

	async getScreenings() {
		return this.prisma.screening.findMany({
			where: { deleted: false },
		})
	}

	async deleteScreening(id: number) {
		return this.prisma.screening.update({
			where: { id: id },
			data: {
				deleted: true,
			},
		})
	}

	async bulkDeleteScreenings(ids: number[]) {
		return this.prisma.screening.updateMany({
			where: { id: { in: ids } },
			data: {
				deleted: true,
			},
		})
	}

	async createScreening(body: z.infer<typeof ScreeningCreateOneSchema>) {
		return this.prisma.screening.create({
			data: body.data,
		})
	}

	async updateScreening(id: number, body: Pick<z.infer<typeof ScreeningUpdateOneSchema>, 'data'>) {
		return this.prisma.screening.update({
			where: {
				id: id,
			},
			data: body.data,
		})
	}

	// ========================================
	// Custom
	// ========================================

	async get7NextDayScreening(screenings: Screening[]) {
		const screeningsByDate: {
			date: Date
			screenings: Screening[]
		}[] = []

		const today = dayjs()

		for (let i = 0; i < 7; i++) {
			const currDate = today.add(i, 'day')

			screeningsByDate.push({
				date: currDate.toDate(),
				screenings: screenings
					.filter((screening) => dayjs(screening.startTime).isSame(currDate, 'day'))
					.sort((a, b) => dayjs(a.startTime).diff(dayjs(b.startTime))),
			})
		}

		return screeningsByDate
	}

	async bookSeats(screeningId: number, seats: number) {
		const screening = await this.getScreening(screeningId)
		if (!screening) throw new NotFoundException(`Screening not found`)

		const availableSeats = screening.availableSeats
		if (availableSeats < seats) {
			throw new BadRequestException(`Pas assez de places disponibles. Il en reste ${availableSeats}`)
		}

		return this.prisma.screening.update({
			where: { id: screeningId },
			data: {
				availableSeats: availableSeats - seats,
			},
		})
	}

	async cancelSeats(screeningId: number, seats: number) {
		return this.prisma.screening.update({
			where: { id: screeningId },
			data: {
				availableSeats: {
					increment: seats,
				},
			},
		})
	}
}
