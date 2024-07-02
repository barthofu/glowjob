import { UserModel } from '@cinestia/prisma'
import { initContract } from '@ts-rest/core'
import { z } from 'zod'

const { router } = initContract()

export const actorsContract = router(
	{},
	{
		pathPrefix: '/actors',
	}
)
