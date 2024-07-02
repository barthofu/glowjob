import { Box, ChakraProps } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

type TableSubComponentLayoutProps = {
    children: ReactNode
}

export const TableSubComponentLayout: React.FC<TableSubComponentLayoutProps> = (props) => {

    return <Box
        p='1em'
        backgroundColor='primary.100'
    >
        {props.children}
    </Box>
}