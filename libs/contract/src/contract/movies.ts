import { MovieCreateOneSchema, MovieModel, MovieUpdateOneSchema } from '@cinestia/prisma'
import { initContract } from '@ts-rest/core'
import { z } from 'zod'
import { CompleteMovieModel, MovieWithPoster, createPaginatedResponseSchema } from '../schemas'

const { router } = initContract()

export const moviesContract = router(
	{
		// Custom
		searchMovie: {
			method: 'GET',
			path: '/search',
			summary: 'Search movies',
			responses: {
				200: MovieWithPoster.array(),
			},
			query: z.object({
				search: z.string(),
			}),
		},
		getFeaturedMovies: {
			method: 'GET',
			path: '/featured',
			summary: 'Get featured movies',
			responses: {
				200: CompleteMovieModel.array(),
			},
		},
		updateMovieImage: {
			method: 'PATCH',
			path: '/:id/image',
			summary: 'Update Movie Poster',
			responses: {
				200: MovieModel,
			},
			body: z.object({
				field: z.union([z.literal('poster'), z.literal('background')]),
				base64: z.string(),
			}),
		},
		// CRUD
		getMovies: {
			method: 'GET',
			path: '',
			summary: 'Get all movies',
			responses: {
				200: createPaginatedResponseSchema(CompleteMovieModel),
			},
			query: z.object({
				page: z.string().default('1'),
				perPage: z.string().default('10'),
			}),
		},
		getMovie: {
			method: 'GET',
			path: '/:id',
			summary: 'Get a movie by id',
			responses: {
				200: CompleteMovieModel,
			},
		},
		createMovie: {
			method: 'POST',
			path: '',
			summary: 'Create Movie',
			responses: {
				201: MovieModel,
			},
			body: MovieCreateOneSchema,
		},
		updateMovie: {
			method: 'PATCH',
			path: '/:id',
			summary: 'Update Movie',
			responses: {
				200: MovieModel,
			},
			body: MovieUpdateOneSchema.pick({
				data: true,
			}),
		},
		deleteMovie: {
			method: 'DELETE',
			path: '/:id',
			summary: 'Delete Movie',
			responses: {
				200: MovieModel,
			},
			body: z.unknown(),
		},
		bulkDeleteMovies: {
			method: 'DELETE',
			path: '',
			summary: 'Bulk Delete Movies',
			responses: {
				200: z.boolean(),
			},
			body: z.array(z.string()),
		},
	},
	{
		pathPrefix: '/movies',
	}
)
