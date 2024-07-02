import { ScreeningCreateOneSchema, ScreeningModel, ScreeningUpdateOneSchema } from '@cinestia/prisma'
import { initContract } from '@ts-rest/core'
import { z } from 'zod'

const { router } = initContract()

export const screeningsContract = router(
	{
		getScreenings: {
			method: 'GET',
			path: '',
			summary: 'Get all screenings',
			responses: {
				200: ScreeningModel.array(),
			},
		},
		getScreening: {
			method: 'GET',
			path: '/:id',
			summary: 'Get a screening by id',
			responses: {
				200: ScreeningModel,
			},
		},
		get7NextDayScreening: {
			method: 'GET',
			path: '/next/:movieId',
			summary: 'Get the screenings of the 7 next day for a given movie',
			responses: {
				200: z
					.object({
						date: z.date(),
						screenings: ScreeningModel.array(),
					})
					.array(),
			},
		},
		createScreening: {
			method: 'POST',
			path: '',
			summary: 'Create Screening',
			responses: {
				201: ScreeningModel,
			},
			body: ScreeningCreateOneSchema,
		},
		updateScreening: {
			method: 'PATCH',
			path: '/:id',
			summary: 'Update Screening',
			responses: {
				200: ScreeningModel,
			},
			body: ScreeningUpdateOneSchema.pick({
				data: true,
			}),
		},
		deleteScreening: {
			method: 'DELETE',
			path: '/:id',
			summary: 'Delete Screening',
			responses: {
				200: ScreeningModel,
			},
			body: z.unknown(),
		},
		bulkDeleteScreenings: {
			method: 'DELETE',
			path: '',
			summary: 'Bulk Delete Screenings',
			responses: {
				200: z.boolean(),
			},
			body: z.array(z.string()), 
		},
	},
	{
		pathPrefix: '/screenings',
	}
)
