import { PrismaClient } from '@prisma/client'
import { v2 as cloudinary } from 'cloudinary'
import { TMDB } from 'tmdb-ts'

const url = 'https://image.tmdb.org/t/p/original'
const token = process.env.TMDB_TOKEN!

const tmdb = new TMDB(token!)

export const createNowPlayingMovies = async (prisma: PrismaClient) => {
	try {
		//API GET Request to get the 'Playing Now' Movies from tmdb
		const movies = await tmdb.movies.nowPlaying({
			language: 'fr-FR',
		})
		const movienames: string[] = []

		//Cloudinary configuration using good credentials
		cloudinary.config({
			cloud_name: process.env.CLOUD_NAME,
			api_key: process.env.API_KEY_CLOUDINARY,
			api_secret: process.env.API_SECRET_CLOUDINARY,
		})

		//Foreach movie create the realisator, the actors based on prisma schema then add the movie to db
		for (const movie of movies.results) {
			//API GET Request to get the details about the specified movie
			const details = await tmdb.movies.details(movie.id)

			//API GET Request to get the actors and the realisators of the specified movie
			const credits = await tmdb.movies.credits(movie.id)

			//API GET Request to get the backgroun image of the movie
			const background = await tmdb.movies.images(movie.id)

			//Searching the movie director/realisator
			const director = credits.crew.find((crew) => crew.job === 'Director')
			if (!director) {
				continue
			}

			//Get the genres of the movies
			const genreNames = details.genres.map((genre) => genre.name)
			const concatenatedGenres = genreNames.join(', ')

			//Cloudinary for movie poster
			let posterUrl: string | null = null
			let posterCloudinaryId: string | null = null
			if (movie.poster_path == null || movie.poster_path == undefined || movie.poster_path == 'null') {
				posterUrl = null
			} else {
				posterUrl = url + movie.poster_path
				try {
					const cloudinaryResponse = await cloudinary.uploader.upload(posterUrl)

					console.log('Image téléchargée avec succès :', cloudinaryResponse.url)
					posterUrl = cloudinaryResponse.url
					posterCloudinaryId = cloudinaryResponse.public_id
				} catch (e) {
					console.error(e)
				}
			}

			//Cloudinary for the background of the movie
			let backgroundUrl: string | null = null
			let backgroundCloudinaryId: string | null = null
			if (
				background.backdrops[0].file_path == null ||
				background.backdrops[0].file_path == undefined ||
				background.backdrops[0].file_path == 'null'
			) {
				backgroundUrl = null
			} else {
				backgroundUrl = url + background.backdrops[0].file_path
				try {
					const cloudinaryResponse = await cloudinary.uploader.upload(backgroundUrl)

					console.log('Image téléchargée avec succès :', cloudinaryResponse.url)
					backgroundUrl = cloudinaryResponse.url
					backgroundCloudinaryId = cloudinaryResponse.public_id
				} catch (e) {
					console.error(e)
				}
			}

			//Cloudinary for the realisator
			let realisatorPictureUrl: string | null = null
			let realisatorPictureCloudinaryId: string | null = null
			if (
				director.profile_path == null ||
				director.profile_path == undefined ||
				director.profile_path == 'null'
			) {
				realisatorPictureUrl = null
			} else {
				realisatorPictureUrl = url + director.profile_path
				try {
					const cloudinaryResponse = await cloudinary.uploader.upload(realisatorPictureUrl)

					console.log('Image téléchargée avec succès :', cloudinaryResponse.url)
					realisatorPictureUrl = cloudinaryResponse.url
					realisatorPictureCloudinaryId = cloudinaryResponse.public_id
				} catch (e) {
					console.error(e)
				}
			}

			const actors = await Promise.all(
				credits.cast.slice(0, 10).map(async (actor) => {
					if (actor.profile_path != null || actor.profile_path != undefined || actor.profile_path == 'null') {
						const cloudinaryResponse = await cloudinary.uploader.upload(url + actor.profile_path)
						return {
							name: actor.name,
							icon: {
								create: {
									url: cloudinaryResponse.url,
									cloudinaryId: cloudinaryResponse.public_id,
								},
							},
							idTmdb: actor.id,
						}
					} else {
						console.log("pas trouvé d'image bro")
						return {
							name: actor.name,
							idTmdb: actor.id,
						}
					}
				})
			)

			//call prisma to create the movie/realisator/actors
			await prisma.movie.create({
				data: {
					title: movie.title,
					realisator: {
						create: {
							name: director.name,
							icon:
								realisatorPictureUrl && realisatorPictureCloudinaryId
									? {
											create: {
												url: realisatorPictureUrl,
												cloudinaryId: realisatorPictureCloudinaryId,
											},
									  }
									: undefined,
							idTmdb: director.id,
						},
					},
					actors: {
						create: actors,
					},
					genre: concatenatedGenres,
					releaseDate: new Date(movie.release_date),
					synopsis: movie.overview,
					duration: details.runtime,
					country: details.production_countries[0].name,
					popularity: details.popularity,
					screenings: {
						create: [],
					},
					poster:
						posterUrl && posterCloudinaryId
							? {
									create: {
										url: posterUrl,
										cloudinaryId: posterCloudinaryId,
									},
							  }
							: undefined,
					background:
						backgroundUrl && backgroundCloudinaryId
							? {
									create: {
										url: backgroundUrl,
										cloudinaryId: backgroundCloudinaryId,
									},
							  }
							: undefined,
				},
			})
			movienames.push(movie.title)
		}
		return movienames
	} catch (err) {
		console.log(err)
		return []
	}
}
