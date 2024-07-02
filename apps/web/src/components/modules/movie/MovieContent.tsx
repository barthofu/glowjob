import { Flex, Image, Text } from '@chakra-ui/react'
import { CompleteMovieModel } from '@cinestia/contract'
import React from 'react'
import { z } from 'zod'

type MovieContentProps = {
    movie: z.infer<typeof CompleteMovieModel>
}

export const MovieContent: React.FC<MovieContentProps> = (props) => {

    return <Flex
        flexDirection='row'
    >
        <Flex
            marginTop='50px'
            padding='20px'
            flexDirection='column'
            width='50%'
            gap={5}
        >
            <Text>Acteurs</Text>
            <Flex
                flexDirection='row'
                alignItems='flex-start'
                overflowX='scroll'
                gap={5}
            >
                {props.movie.actors.map((actor) => {
                    return <Flex
                        key={actor.id}
                        flexDirection='column'
                        width='100px'
                    >
                        <Image
                            borderRadius='8px'
                            src={actor.icon?.url}
                            minWidth='100px'
                            width='100px'
                            height='130px'
                            objectFit='cover'
                            objectPosition='top'
                        />
                        <Text overflowWrap='break-word'>{actor.name}</Text>

                    </Flex>
                })}
            </Flex>
        </Flex>

        <Flex
            marginTop='50px'
            padding='20px'
            flexDirection='column'
            width='50%'
            gap={5}>
            <Text>Scéances</Text>
            <Flex
                flexDirection='column'>
                <Text>Lundi</Text>
                <Flex
                    gap='5'
                    overflowX='scroll'
                    width='100%'
                >
                    {/* <Card minWidth='200px' padding={0}>
                        <Grid templateColumns='repeat(4, 1fr)' padding='0' fontSize={7}>
                            <GridItem textAlign='left'>VF</GridItem>
                            <GridItem textAlign='center' fontSize={10} colSpan={2}>19:56<br />(fin 20:52)</GridItem>
                            <GridItem textAlign='right' >OK</GridItem>
                            <GridItem colSpan={4} textAlign='center' >Salle 13</GridItem>

                        </Grid>
                    </Card>
                    <Card minWidth='200px'>
                        Hello world
                    </Card>
                    <Card minWidth='200px'>
                        Hello world
                    </Card>
                    <Card minWidth='200px'>
                        Hello world
                    </Card>
                    <Card minWidth='200px'>
                        Hello world
                    </Card> */}
                </Flex>

            </Flex>
        </Flex>
    </Flex >
}