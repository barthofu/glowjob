import { Flex, Spinner, SpinnerProps } from '@chakra-ui/react'
import React from 'react'

type LoadingProps = {
    fullScreen?: boolean
} & SpinnerProps

export const Loading: React.FC<LoadingProps> = ({ fullScreen, ...spinnerProps }) => {

    return <Flex
        w='100%'
        h={fullScreen ? '100vh' : '100%'}
        justifyContent='center'
        alignItems='center'
        position='absolute'
        top='0'
        left='0'
        zIndex='999'
    >
        <Spinner {...spinnerProps} />
    </Flex>
}