import { Prisma, PrismaClient } from '@prisma/client'

export const createScreenings = async (prisma: PrismaClient) => {

	const movies = await prisma.movie.findMany()

	const screenings = []
	for (const movie of movies) {
		const movieScreenings = generateRandomScreeningsForMovie(prisma, movie.id)
		screenings.push(...movieScreenings)
	}

	for (const screening of screenings) {
		await prisma.screening.create({
			data: screening,
		})
	}

}

/**
 * Creates, for each movies, between 10 and 15 screenings randomly dispatched during 2 weeks from now
 */ 
function generateRandomScreeningsForMovie(prisma: PrismaClient, movieId: number) {
	const screenings = []
	const numberOfScreenings = Math.floor(Math.random() * 6) + 10 // between 10 and 15

	for (let i = 0; i < numberOfScreenings; i++) {
		const screening: Prisma.ScreeningCreateInput = {
			movie: {
				connect: { id: movieId },
			},
			room: Math.floor(Math.random() * 20) + 1,
			roomCapacity: 150,
			availableSeats: Math.floor(Math.random() * 150) + 1,
			startTime: new Date(Date.now() + Math.floor(Math.random() * 12096e5)),
			handicapFriendly: Math.random() > 0.5,
			language: Math.random() > 0.5 ? 'VF' : 'VOSTFR',
		}
		screenings.push(screening)
	}
	return screenings
}