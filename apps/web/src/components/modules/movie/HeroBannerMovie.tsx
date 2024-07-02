import { Flex, HStack, Image, Text, VStack } from '@chakra-ui/react'
import { CompleteMovieModel } from '@cinestia/contract'
import { dayjs } from '@cinestia/utils'
import React from 'react'
import { z } from 'zod'
import { Badge } from '../../shared'

type HeroBannerMovieProps = {
    movie: z.infer<typeof CompleteMovieModel>
}

export const HeroBannerMovie: React.FC<HeroBannerMovieProps> = ({ movie }) => {

    return (
        <HStack
            height='80vh'
            zIndex='2'
            justifyContent='space-between'
        >
            {/* Movie infos */}
            <Flex flexDir='column' alignItems='flex-start' gap='2em' w='70%'>

                {/* Title */}
                <Text fontSize='4em' fontWeight='900' lineHeight='1.2em'>{movie.title}</Text>

                {/* Synopsis */}
                <Text w='80%'>{movie.synopsis}</Text>

                <VStack
                    spacing='.5em'
                    alignItems='flex-start'
                >
                    {/* Realisator */}
                    <Text>{movie.realisator?.name}</Text>

                    {/* Genres */}
                    <Text
                        color='secondary.50'
                        textShadow='0 0 20px rgba(0,0,0,0.5)'
                    >
                        {movie.genre?.split(', ').join(' • ')}
                    </Text>

                    <Flex gap={5} alignItems='center' mt='2em'>
                        {/* Language */}
                        <Badge filled={true} w='4em'>{new Date(movie.releaseDate).getFullYear()}</Badge>

                        {/* Duration */}
                        <Badge w='4em'>{dayjs().startOf('day').add(movie.duration, 'minute').format('H[h]MM')}</Badge>
                    </Flex>
                </VStack>
            </Flex>

            {/* Cover */}
            <Image
                src={movie.poster?.url}
                height='50vh'
                borderRadius='5px'
                boxShadow='0 0 10px rgba(0,0,0,0.5)'
            // animation={animation}
            />
        </HStack>
    )
}