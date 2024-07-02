import { Box, HStack, VStack } from '@chakra-ui/react'
import React from 'react'
import { LoaderFunction, useLoaderData } from 'react-router-typesafe'
import { DefaultLayout } from '../../components/layouts'
import { HeroBannerMovie, MovieActors, Screenings } from '../../components/modules'
import { queryClient } from '../../core/libs/http'
import { CatchInternal } from '../../components/shared'

export const Loader = (async ({ params }) => {
    return queryClient.movies.getMovie.query({ params: { id: params.id! } })
}) satisfies LoaderFunction

export const Catch = () => <CatchInternal />

const MovieDetailsPage: React.FC = () => {

    const movie = useLoaderData<typeof Loader>()

    return (
        <DefaultLayout
            title={movie.status === 200 ? movie.body.title : undefined}
            fadedImage={movie.status === 200 ? movie.body.background?.url : undefined}
            queryStatus={movie.status}
        >

            {/* Content */}
            {movie.status === 200 && <VStack>

                {/* Banner */}
                <HeroBannerMovie movie={movie.body} />

                {/* Content */}
                <HStack w='100%' mt='2em' alignItems='flex-start' justifyContent='space-between'>
                    <Box w='50%'>
                        <MovieActors actors={movie.body.actors} />
                    </Box>
                    <Box w='45%'>
                        <Screenings movie={{
                            id: movie.body.id,
                            duration: movie.body.duration
                        }} />
                    </Box>
                </HStack>
            </VStack>}
        </DefaultLayout>
    )
}

export default MovieDetailsPage