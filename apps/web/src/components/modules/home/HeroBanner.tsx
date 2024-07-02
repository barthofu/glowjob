import { Flex, HStack, Heading, Image, Text, VStack } from '@chakra-ui/react'
import { CompleteMovieModel } from '@cinestia/contract'
import { Link, useNavigate } from '@cinestia/web/router'
import React from 'react'
import { z } from 'zod'
import { NextScreenings } from '../screening/NextScreenings'

type HeroBannerProps = {
    movie?: z.infer<typeof CompleteMovieModel>
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ movie }) => {

    const navigate = useNavigate()

    return (
        <Flex
            width='100%'
            height='80vh'
            display='flex'
            justifyContent='center'
            alignItems='center'
            zIndex='4'
        >
            {movie &&
                <HStack w='80vw' mt='5em' alignItems='flex-start'>

                    {movie.poster && <Image
                        src={movie.poster.url}
                        height='60vh'
                        objectFit='cover'
                        objectPosition='top'
                        borderRadius='8px'
                        cursor='pointer'
                        sx={{
                            boxShadow: '0 0 20px rgba(0,0,0,0.5)'
                        }}
                        onClick={() => navigate('/movies/:id', { params: { id: String(movie.id) } })}
                    />}

                    <VStack padding='2em' alignItems='flex-start' spacing='2em'>

                        {/* Release year */}
                        {movie.releaseDate &&
                            <Text
                                fontSize='.9em'
                                color='gray.200'
                                textShadow='0 0 20px rgba(0,0,0,0.5)'
                            >
                                {new Date(movie.releaseDate).getFullYear()}
                            </Text>
                        }

                        {/* Film title */}
                        <Link to='/movies/:id' params={{ id: String(movie.id) }}>
                            <Heading
                                as='h2'
                                fontSize='3em'
                                color='white'
                                fontWeight='bold'
                                textShadow='0 0 20px rgba(0,0,0,0.5)'
                            >
                                {movie.title}
                            </Heading>
                        </Link>

                        {/* Genres */}
                        {movie.genre &&
                            <Text
                                fontSize='1.1em'
                                color='secondary.50'
                                textShadow='0 0 20px rgba(0,0,0,0.5)'
                            >
                                {movie.genre?.split(', ').join(' • ')}
                            </Text>
                        }

                        {/* Synopsis */}
                        {movie.synopsis &&
                            <Text
                                fontSize='1em'
                                color='secondary.50'
                                textShadow='0 0 20px rgba(0,0,0,0.5)'
                                maxWidth='75%'
                            >
                                {movie.synopsis}
                            </Text>
                        }

                        {/* Infos */}
                        <HStack spacing='2em' color='secondary.50'>
                            {movie.realisator &&
                                <Text
                                    textShadow='0 0 20px rgba(0,0,0,0.5)'
                                >
                                    {movie.realisator.name}
                                </Text>
                            }
                            {movie.duration &&
                                <Text
                                    textShadow='0 0 20px rgba(0,0,0,0.5)'
                                >
                                    {movie.duration} min
                                </Text>
                            }
                        </HStack>

                        {/* Next screenings */}
                        <NextScreenings screenings={movie.screenings} />

                    </VStack>
                </HStack>
            }

        </Flex>
    )
}