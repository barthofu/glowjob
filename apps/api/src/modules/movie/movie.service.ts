import { MovieCreateOneSchema, MovieUpdateOneSchema, PrismaService } from '@cinestia/prisma'
import { Injectable } from '@nestjs/common'
import { z } from 'zod'
import { createPaginator } from 'prisma-pagination'
import { CompleteMovieModel } from '@cinestia/contract'
import { Prisma } from '@prisma/client'
import { ImageService } from '../../core/services/image.service'

@Injectable()
export class MovieService {
	constructor(private prisma: PrismaService, private imageService: ImageService) {}

	// ========================================
	// Custom
	// ========================================

	async searchMovie(searchString: string) {
		return this.prisma.movie.findMany({
			take: 5,
			where: {
				title: {
					contains: searchString,
				},
				deleted: false
			},
			include: {
				poster: true,
			},
		})
	}

	async updateMoviePoster(id: number, base64File: string) {
		// 1. Upload image to cloudinary
		const uploadedImage = await this.imageService.uploadToCloudinary(base64File)

		// 2. Update movie poster
		return this.updateMovie(id, {
			data: {
				poster: {
					create: {
						cloudinaryId: uploadedImage.public_id,
						url: uploadedImage.secure_url,
					},
				},
			},
		})
	}

	async updateMovieImage(id: number, field: 'poster' | 'background', base64File: string) {
		// 1. Upload image to cloudinary
		const uploadedImage = await this.imageService.uploadToCloudinary(base64File)

		// 2. Update movie poster
		return this.updateMovie(id, {
			data: {
				[field]: {
					create: {
						cloudinaryId: uploadedImage.public_id,
						url: uploadedImage.secure_url,
					},
				},
			},
		})
	}

	// ========================================
	// CRUD
	// ========================================

	async getMovie(id: number) {
		return this.prisma.movie.findUnique({
			where: { id },
			include: {
				poster: true,
				actors: {
					include: {
						icon: true,
					},
				},
				screenings: true,
				realisator: true,
				background: true,
			},
		})
	}

	async getMovieWithScreenings(id: number) {
		return this.prisma.movie.findUnique({
			where: { 
				id 
			},
			include: {
				screenings: true,
			},
		})
	}

	async getMovies(page: number, perPage: number) {
		const paginate = createPaginator({ perPage })

		return paginate<z.infer<typeof CompleteMovieModel>, Prisma.MovieFindManyArgs>(
			this.prisma.movie,
			{
				where: { deleted: false },
				include: {
					poster: true,
					actors: {
						include: {
							icon: true,
						},
					},
					screenings: true,
					realisator: true,
					background: true,
				},
			},
			{
				page,
			}
		)
	}

	async getFeaturedMovies() {
		return this.prisma.movie.findMany({
			where: {
				featured: true,
				deleted: false,
			},
			include: {
				poster: true,
				actors: {
					include: {
						icon: true,
					},
				},
				screenings: true,
				realisator: true,
				background: true,
			},
		})
	}

	async deleteMovie(id: number) {
		return this.prisma.movie.update({
			where: { id: id },
			data: {
				deleted: true
			}
		})
	}

	async bulkDeleteMovies(ids: number[]) {
		return this.prisma.movie.updateMany({
			where: { id: { in: ids } },
			data: {
				deleted: true
			}
		})
	}

	async createMovie(body: z.infer<typeof MovieCreateOneSchema>) {
		return this.prisma.movie.create({
			data: body.data,
		})
	}

	async updateMovie(id: number, body: Pick<z.infer<typeof MovieUpdateOneSchema>, 'data'>) {
		return this.prisma.movie.update({
			where: {
				id: id,
			},
			data: body.data,
		})
	}
}
