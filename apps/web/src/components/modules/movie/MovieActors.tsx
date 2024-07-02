import { HStack, VStack, Image, Text } from '@chakra-ui/react'
import { ActorWithIcon } from '@cinestia/contract'
import React from 'react'
import { z } from 'zod'

type MovieActorsProps = {
    actors: z.infer<typeof ActorWithIcon>[]
}

export const MovieActors: React.FC<MovieActorsProps> = (props) => {

    return <HStack overflowX='scroll' alignItems='flex-start' gap='1em' pb='1em'>
        {props.actors.map(actor => (
            <VStack key={actor.id}>
                <Image
                    borderRadius='8px'
                    src={actor.icon?.url}
                    minWidth='100px'
                    width='100px'
                    height='130px'
                    objectFit='cover'
                    objectPosition='top'
                    fallbackSrc='https://riverdalerobotics.com/images/placeholder.jpg'
                />
                <Text
                    overflowWrap='break-word'
                    color='secondary.50'
                    textAlign='center'
                >
                    {actor.name}
                </Text>

            </VStack>
        ))}
    </HStack>
}