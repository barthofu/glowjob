import { Box, VStack } from '@chakra-ui/react'
import { CompleteMovieModel } from '@cinestia/contract'
import { useEffect, useState } from 'react'
import { z } from 'zod'
import { DefaultLayout } from '../components/layouts'
import { HeroBanner, HomeContent } from '../components/modules'
import { Loading } from '../components/shared'
import { queryClient } from '../core/libs/http'

const HomePage = () => {

	const movies = queryClient.movies.getFeaturedMovies.useQuery(['home-movies'])
	const [topMovies, setTopMovies] = useState<z.infer<typeof CompleteMovieModel>[]>()
	const [pinnedMovieIndex, setPinnedMovieIndex] = useState<number>(0)

	useEffect(() => {
		if (movies.data?.status === 200 && movies.data?.body) {
			setTopMovies(movies.data.body
				.sort((a, b) => b.popularity - a.popularity)
				.filter(movie =>
					movie.poster
					&& movie.background
					// && movie.screenings.length > 0
				)
				.slice(0, 3)
			)
		}
	}, [movies.data])

	useEffect(() => {
		if (topMovies) {
			const interval = setInterval(() => {
				console.log('top', topMovies)
				if (topMovies) {
					console.log(pinnedMovieIndex)
					setPinnedMovieIndex(prev => prev + 1 === topMovies.length ? 0 : prev + 1)
				}
			}, 1000 * 7.5)
			return () => clearInterval(interval)
		}
	}, [topMovies])

	return (
		<DefaultLayout
			title='Cinestia'
			fadedImage={topMovies && topMovies[pinnedMovieIndex].background?.url}
			queryStatus={movies.data?.status}
		>
			<Box>
				{/* Loading */}
				{movies.isLoading && <Loading fullScreen={true} />}

				{/* Content */}
				<VStack gap='5em'>
					{topMovies && <HeroBanner movie={topMovies[pinnedMovieIndex]} />}
					{movies.data?.status === 200 && <HomeContent movies={movies.data.body} />}
				</VStack>
			</Box>
		</DefaultLayout>
	)
}

export default HomePage
