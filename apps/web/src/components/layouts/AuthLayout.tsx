import { HStack, Image, VStack } from '@chakra-ui/react'
import { pickNRandomElementsFromArray } from '@cinestia/utils'
import React from 'react'
import { Helmet } from 'react-helmet'
import { queryClient } from '../../core/libs/http'

type AuthLayoutProps = {
    children: React.ReactNode
    title?: string
}

export const AuthLayout: React.FC<AuthLayoutProps> = (props) => {

    const movies = queryClient.movies.getFeaturedMovies.useQuery(['auth-movies'], {}, {
        refetchInterval: 0,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    })

    const processedMovies: string[][] = []
    if (movies.data?.status === 200) {
        const filteredMovies = movies.data.body.filter(movie => movie.poster?.url)
        for (let i = 0; i < 5; i++) {
            const posters = pickNRandomElementsFromArray(filteredMovies, 10)
                .map(movie => movie.poster!.url)
            processedMovies.push(posters)
        }
    }

    return (
        <HStack w='100%' h='100vh' overflow='hidden' position='relative' justifyContent='flex-end'>

            <Helmet>
                <title>{props.title || 'Cinéstia'}</title>
            </Helmet>

            <VStack
                h='100%'
                position='absolute'
                top='-35%'
                left='10%'
                spacing='3em'
                transform='rotate(-25deg)'
                opacity='0.3'
            >
                {processedMovies.map((posters, i) => (
                    <HStack
                        key={i}
                        w='100%'
                        h='100vh'
                        spacing='3em'
                        justifyContent='center'
                        alignItems='center'
                        mr={i % 2 === 0 ? '100px' : undefined}
                        ml={i % 2 === 1 ? '100px' : undefined}
                    >
                        {posters.map((poster, j) => (
                            <Image
                                key={j}
                                w='200px'
                                zIndex={2}
                                src={poster}
                                bgSize='cover'
                                bgPosition='center'
                                borderRadius='5px'
                                boxShadow='0 0 10px 0 rgba(0,0,0,0.2)'
                            />
                        ))}
                    </HStack>
                ))}
            </VStack>

            <VStack
                w='40%'
                h='100vh'
                justifyContent='center'
                alignItems='center'
                zIndex={4}
                bg='primary.100'
            >
                {props.children}
            </VStack>

        </HStack>
    )
}