import { ChakraProps, Flex } from '@chakra-ui/react'
import React from 'react'

type CardProps = {
  children: React.ReactNode
  disabled?: boolean
  center?: boolean
} & ChakraProps

export const Card: React.FC<CardProps> = ({ children, center, disabled, ...props }) => {

  return (
    <Flex
      flexDirection='column'
      alignItems={center ? 'center' : 'flex-start'}
      backgroundColor='primary.100'
      borderRadius='5px'
      border='1px solid'
      borderColor='gray.700'
      p='2em'
      gap='1em'
      {...props}
      {...(disabled ? {
        opacity: '.5',
        cursor: 'not-allowed'
      } : {})}
    >
      {children}
    </Flex>
  )
}
