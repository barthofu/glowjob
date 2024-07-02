import { Flex, Heading } from '@chakra-ui/react'
import React from 'react'

type NotFoundProps = {}

export const NotFound: React.FC<NotFoundProps> = () => {

    return <Flex
        w='100%'
        h='100vh'
        position='absolute'
        top='0' left='0'
        justifyContent='center'
        alignItems='center'
    >

        <Heading as='h2' fontSize='4xl'>
            404 - Page non trouvée
        </Heading>

    </Flex>
}