import { ChakraProps, Flex } from '@chakra-ui/react'
import React from 'react'

type BadgeProps = {
    children: React.ReactNode
    color?: string
    filled?: boolean
} & ChakraProps

export const Badge: React.FC<BadgeProps> = ({ children, filled, color, ...chakraProps }) => {

    return <Flex
        justifyContent='center'
        padding='.25em .75em'
        borderRadius='5px'
        {...(filled ? {
            backgroundColor: color || 'primary.50',
            color: 'secondary.50',
        } : {
            backgroundColor: 'primary.100',
            border: '1px solid',
            borderColor: color || 'primary.50',
            color: 'secondary.100',
        })}
        {...chakraProps}
    >
        {children}
    </Flex>

}