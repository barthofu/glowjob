import { UserModel, UserUpdateOneSchema } from '@cinestia/prisma'
import { initContract } from '@ts-rest/core'

const { router } = initContract()

export const profileContract = router(
	{
		updateProfile: {
			method: 'PATCH',
			path: '/:id',
			summary: 'Update user profile',
			responses: {
				200: UserModel,
			},
			body: UserUpdateOneSchema.pick({
				data: true,
			}),
		},
	},
	{
		pathPrefix: '/profile',
	}
)
