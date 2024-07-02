import { HStack } from '@chakra-ui/react'
import React from 'react'
import { NavLink } from './NavLink'
import { ProfileButton } from './ProfileButton'
import { Search } from './Search'

type NavbarProps = {}

export const Navbar: React.FC<NavbarProps> = () => {

    return <HStack
        width='100%'
        height='5em'
        justifyContent='space-between'
        px='10vw'
        position='fixed'
        top='0' left='0'
        zIndex='2'
    >
        {/* Left part */}
        <HStack>
            <NavLink to='/' fontSize='xl'>
                Cinéstia - Bourgouin Jailleux
            </NavLink>

            {/* <NavLink to='/'>Accueil</NavLink> */}
            {/* <Text>
                A propos
            </Text>
            <Text>
                Contact
            </Text> */}
        </HStack>

        {/* Right part */}
        <HStack
            spacing='2em'
        >
            <Search />
            <ProfileButton />
        </HStack>
    </HStack>
}