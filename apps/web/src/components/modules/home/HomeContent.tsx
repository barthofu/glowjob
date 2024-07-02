import { Box, Flex, Grid, Image, Text } from '@chakra-ui/react'
import { CompleteMovieModel } from '@cinestia/contract'
import { Link } from '@cinestia/web/router'
import React from 'react'
import { z } from 'zod'
import { PopBox } from '../../shared'

type HomeContentProps = {
    movies: z.infer<typeof CompleteMovieModel>[]
}

export const HomeContent: React.FC<HomeContentProps> = (props) => {


    return <Grid
        templateColumns='repeat(4, 1fr)'
        gap={6}
    >

        {props.movies.map(movie => {
            return (
                <Link key={movie.id} to='/movies/:id' params={{ id: String(movie.id) }}>
                    <PopBox>

                        <Flex
                            flexDirection='column'
                            alignItems="center"
                            sx={{
                                '&:hover .movies': {
                                    transform: "scale(1.1)"
                                }
                            }}
                        >
                            <Box
                                overflow="hidden"
                                border="1px solid"
                                borderColor="gray.700"
                                borderRadius="5px"
                            >
                                <Image
                                    transition='transform .2s'
                                    className='movies' src={movie.poster?.url} width="15vw"
                                />
                            </Box>
                            <Box padding="5">
                                <Text color="primary.50" textAlign="center" fontSize="1.2em" fontWeight='bold'>
                                    {movie.title}
                                </Text>
                                <Text color="white" fontSize="0.8em" textAlign="center">
                                    {movie.genre}
                                </Text>
                            </Box>
                        </Flex>
                    </PopBox>
                </Link>
            )
        })
        }
    </Grid >
}