import { initContract } from '@ts-rest/core'

import { authContract } from './auth'
import { usersContract } from './users'
import { moviesContract } from './movies'
import { screeningsContract } from './screenings'
import { profileContract } from './profile'
import { reservationsContract } from './reservations'

const { router } = initContract()

export const contract = router(
	{
		auth: authContract,
		users: usersContract,
		movies: moviesContract,
		screenings: screeningsContract,
		profiles: profileContract,
		reservations: reservationsContract,
	},
	{
		pathPrefix: '/api/v1',
	}
)
