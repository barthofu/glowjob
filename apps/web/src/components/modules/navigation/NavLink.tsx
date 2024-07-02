import { ChakraProps, Text } from '@chakra-ui/react'
import { Link, Path } from '@cinestia/web/router'
import React from 'react'

type NavLinkProps = {
    to: Path
    children: React.ReactNode
    active?: ChakraProps
} & ChakraProps

export const NavLink: React.FC<NavLinkProps> = ({ to, children, active, ...chakraProps }) => {

    const isActive = !!active && to === window.location.pathname

    return <Link to={to as any}>
        <Text {...chakraProps} {...isActive ? active : {}}>
            {children}
        </Text>
    </Link>
}   