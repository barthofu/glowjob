import { PrismaClient } from '@prisma/client'
import { createNowPlayingMovies } from './movies'
import { createUsers } from './users'
import { createScreenings } from './screenings'

const main = async () => {
	const prisma = new PrismaClient()
	prisma.$connect()

	await createNowPlayingMovies(prisma)
	await createScreenings(prisma)
	await createUsers(prisma)

	prisma.$disconnect()
}

main()
