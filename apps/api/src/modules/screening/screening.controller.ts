import { Controller, UseGuards } from '@nestjs/common'
import { ScreeningService } from './screening.service'
import { MovieService } from '../movie/movie.service'
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest'
import { contract } from '@cinestia/contract'
import { JwtGuard, Role, Roles } from '@cinestia/api/auth'

@Controller()
export class ScreeningController {
	constructor(private readonly screeningsService: ScreeningService, private readonly moviesService: MovieService) {}

	@TsRestHandler(contract.screenings.getScreenings)
	@Roles(Role.Admin)
	@UseGuards(JwtGuard)
	async getScreenings() {
		return tsRestHandler(contract.screenings.getScreenings, async () => {
			const screenings = await this.screeningsService.getScreenings()
			return {
				status: 200,
				body: screenings,
			}
		})
	}

	@TsRestHandler(contract.screenings.getScreening)
	async getScreening() {
		return tsRestHandler(contract.screenings.getScreening, async ({ params }) => {
			const screening = await this.screeningsService.getScreening(parseInt(params.id))

			if (!screening)
				return {
					status: 404,
					body: {
						message: 'Screening not found',
					},
				}

			return {
				status: 200,
				body: screening,
			}
		})
	}

	@TsRestHandler(contract.screenings.get7NextDayScreening)
	async get7NextDayScreening() {
		return tsRestHandler(contract.screenings.get7NextDayScreening, async ({ params }) => {
			const movie = await this.moviesService.getMovieWithScreenings(parseInt(params.movieId))

			if (!movie)
				return {
					status: 404,
					body: {
						message: 'Movie not found',
					},
				}

			const screenings = await this.screeningsService.get7NextDayScreening(movie.screenings)

			return {
				status: 200,
				body: screenings,
			}
		})
	}

	@TsRestHandler(contract.screenings.createScreening)
	@Roles(Role.Admin)
	@UseGuards(JwtGuard)
	async createScreening() {
		return tsRestHandler(contract.screenings.createScreening, async ({ body }) => {
			const screening = await this.screeningsService.createScreening(body)

			if (!screening)
				return {
					status: 404,
					body: {
						message: 'Screening not found',
					},
				}

			return {
				status: 201,
				body: screening,
			}
		})
	}

	@TsRestHandler(contract.screenings.deleteScreening)
	@Roles(Role.Admin)
	@UseGuards(JwtGuard)
	async deleteScreening() {
		return tsRestHandler(contract.screenings.deleteScreening, async ({ params }) => {
			const screening = await this.screeningsService.deleteScreening(parseInt(params.id))

			if (!screening)
				return {
					status: 404,
					body: {
						message: 'Screening not found',
					},
				}

			return {
				status: 200,
				body: screening,
			}
		})
	}

	@TsRestHandler(contract.screenings.bulkDeleteScreenings)
	@Roles(Role.Admin)
	@UseGuards(JwtGuard)
	async bulkDeleteScreenings() {
		return tsRestHandler(contract.screenings.bulkDeleteScreenings, async ({ body }) => {
			const ids = body.map((id) => parseInt(id))
			await this.screeningsService.bulkDeleteScreenings(ids)

			return {
				status: 200,
				body: true,
			}
		})
	}

	@TsRestHandler(contract.screenings.updateScreening)
	@Roles(Role.Admin)
	@UseGuards(JwtGuard)
	async updateScreening() {
		return tsRestHandler(contract.screenings.updateScreening, async ({ body, params }) => {
			const screening = await this.screeningsService.updateScreening(parseInt(params.id), body)

			if (!screening)
				return {
					status: 404,
					body: {
						message: 'Screening not found',
					},
				}

			return {
				status: 200,
				body: screening,
			}
		})
	}
}
