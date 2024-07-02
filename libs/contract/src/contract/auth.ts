import { UserModel } from '@cinestia/prisma'
import { initContract } from '@ts-rest/core'
import { z } from 'zod'
import { UserWithReservations } from '../schemas'

const { router } = initContract()

export const authContract = router(
	{
		register: {
			method: 'POST',
			path: '/register',
			responses: {
				201: UserModel,
			},
			body: z.object({
				firstName: z.string(),
				lastName: z.string(),
				gender: z.string(),
				email: z.string(),
				password: z.string(),
				confirmPassword: z.string(),
			}),
			summary: 'Create User',
		},
		login: {
			method: 'POST',
			path: '/login',
			responses: {
				200: z.object({
					access_token: z.string(),
					user: UserModel,
				}),
			},
			body: z.object({
				username: z.string(),
				password: z.string(),
			}),
			summary: 'User login',
		},
		me: {
			method: 'GET',
			path: '/me',
			summary: 'Get information about currently connected user',
			responses: {
				200: UserWithReservations,
			},
			headers: z.object({
				authorization: z.string().optional(),
			}),
		},
	},
	{
		pathPrefix: '/auth',
	}
)
