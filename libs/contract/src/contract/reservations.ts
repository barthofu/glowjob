import { ReservationModel, ReservationUpdateOneSchema } from '@cinestia/prisma'
import { initContract } from '@ts-rest/core'
import { z } from 'zod'
import { ReservationWithUser, createPaginatedResponseSchema } from '../schemas'

const { router } = initContract()

export const reservationsContract = router(
	{
		// CRUD
		getReservations: {
			method: 'GET',
			path: '',
			summary: 'Get Reservations',
			responses: {
				200: createPaginatedResponseSchema(ReservationWithUser),
			},
			query: z.object({
				page: z.string().default('1'),
				perPage: z.string().default('10'),
				screeningId: z.string().optional(),
			})
		},
		getReservation: {
			method: 'GET',
			path: '/:id',
			summary: 'Get Reservation',
			responses: {
				200: ReservationModel,
			},
		},
		createReservation: {
			method: 'POST',
			path: '',
			summary: 'Create Reservation',
			responses: {
				201: ReservationModel,
			},
			body: z.object({
				screeningId: z.number().int(),
				amount: z.number().int(),
			}),
		},
		updateReservation: {
			method: 'PATCH',
			path: '/:id',
			summary: 'Update Reservation',
			responses: {
				200: ReservationModel,
			},
			body: ReservationUpdateOneSchema,
		},

		// Custom
		validateReservation: {
			method: 'POST',
			path: '/validate',
			summary: 'Validate Reservation',
			responses: {
				200: ReservationModel,
			},
			body: z.object({
				checkoutId: z.string(),
			}),
		},
		cancelReservation: {
			method: 'POST',
			path: '/cancel',
			summary: 'Cancel Reservation',
			responses: {
				200: ReservationModel,
			},
			body: z.object({
				checkoutId: z.string(),
			}),
		},
	},
	{
		pathPrefix: '/reservations',
	}
)
