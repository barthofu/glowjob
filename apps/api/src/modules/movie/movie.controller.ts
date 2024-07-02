import { contract } from '@cinestia/contract'
import { Controller, UseGuards } from '@nestjs/common'
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest'
import { MovieService } from './movie.service'
import { JwtGuard, Role, Roles } from '@cinestia/api/auth'

@Controller()
export class MovieController {
	constructor(private readonly movieService: MovieService) {}

	// ========================================
	// Custom
	// ========================================

	@TsRestHandler(contract.movies.getFeaturedMovies)
	async getFeaturedMovies() {
		return tsRestHandler(contract.movies.getFeaturedMovies, async () => {
			const movies = await this.movieService.getFeaturedMovies()
			return {
				status: 200,
				body: movies,
			}
		})
	}

	@TsRestHandler(contract.movies.searchMovie)
	async searchMovie() {
		return tsRestHandler(contract.movies.searchMovie, async ({ query }) => {
			const movies = query.search === '' ? [] : await this.movieService.searchMovie(query.search)

			return {
				status: 200,
				body: movies,
			}
		})
	}

	@TsRestHandler(contract.movies.updateMovieImage)
	@Roles(Role.Admin)
	@UseGuards(JwtGuard)
	async updateMovieImage() {
		return tsRestHandler(contract.movies.updateMovieImage, async ({ params, body }) => {
			const movie = await this.movieService.updateMovieImage(parseInt(params.id), body.field, body.base64)

			if (!movie) return { status: 404, body: { message: 'Movie not found' } }

			return {
				status: 200,
				body: movie,
			}
		})
	}

	// ========================================
	// CRUD
	// ========================================

	@TsRestHandler(contract.movies.getMovies)
	@Roles(Role.Admin)
	@UseGuards(JwtGuard)
	async getMovies() {
		return tsRestHandler(contract.movies.getMovies, async ({ query }) => {
			const movies = await this.movieService.getMovies(Number(query.page), Number(query.perPage))
			return {
				status: 200,
				body: movies,
			}
		})
	}

	@TsRestHandler(contract.movies.getMovie)
	async getMovie() {
		return tsRestHandler(contract.movies.getMovie, async ({ params }) => {
			const movie = await this.movieService.getMovie(parseInt(params.id))

			if (!movie)
				return {
					status: 404,
					body: {
						message: 'Movie not found',
					},
				}

			return {
				status: 200,
				body: movie,
			}
		})
	}

	@TsRestHandler(contract.movies.createMovie)
	@Roles(Role.Admin)
	@UseGuards(JwtGuard)
	async createMovie() {
		return tsRestHandler(contract.movies.createMovie, async ({ body }) => {
			const movie = await this.movieService.createMovie(body)
			if (!movie)
				return {
					status: 404,
					body: {
						message: 'Movie not found',
					},
				}

			return {
				status: 201,
				body: movie,
			}
		})
	}

	@TsRestHandler(contract.movies.deleteMovie)
	@Roles(Role.Admin)
	@UseGuards(JwtGuard)
	async deleteMovie() {
		return tsRestHandler(contract.movies.deleteMovie, async ({ params }) => {
			const movie = await this.movieService.deleteMovie(parseInt(params.id))

			if (!movie)
				return {
					status: 404,
					body: {
						message: 'Movie not found',
					},
				}

			return {
				status: 200,
				body: movie,
			}
		})
	}

	@TsRestHandler(contract.movies.bulkDeleteMovies)
	@Roles(Role.Admin)
	@UseGuards(JwtGuard)
	async bulkDeleteMovies() {
		return tsRestHandler(contract.movies.bulkDeleteMovies, async ({ body }) => {
			const ids = body.map((id) => parseInt(id))
			await this.movieService.bulkDeleteMovies(ids)

			return {
				status: 200,
				body: true,
			}
		})
	}

	@TsRestHandler(contract.movies.updateMovie)
	@Roles(Role.Admin)
	@UseGuards(JwtGuard)
	async updateMovie() {
		return tsRestHandler(contract.movies.updateMovie, async ({ body, params }) => {
			const movie = await this.movieService.updateMovie(parseInt(params.id), body)

			if (!movie)
				return {
					status: 404,
					body: {
						message: 'Movie not found',
					},
				}

			return {
				status: 200,
				body: movie,
			}
		})
	}
}
