import { ChakraProps, HStack, IconButton, VStack } from '@chakra-ui/react'
import { AuthGuard } from '@cinestia/web/auth'
import { useNavigate } from '@cinestia/web/router'
import React from 'react'
import { Helmet } from 'react-helmet'
import { RxExit } from 'react-icons/rx'
import { ProfileButton } from '../modules'

type AdminLayoutProps = {
    children: React.ReactNode
    title?: string
}

export const AdminLayout: React.FC<AdminLayoutProps> = (props) => {

    const navigate = useNavigate()

    // const navLinkActiveStyles: ChakraProps = {
    //     backgroundColor: 'primary.50',
    //     padding: '.25em .75em',
    //     borderRadius: '15px',
    // }

    return <AuthGuard adminOnly={true}>
        <VStack
            padding='2em'
            justifyContent='flex-start'
        >
            <Helmet>
                <title>{props.title || 'Cinéstia'}</title>
            </Helmet>

            <HStack justifyContent='space-between' w='100%' mb='3em'>

                <IconButton
                    aria-label="Retourner à l'accueil"
                    as={RxExit}
                    variant='unstyled'
                    size='sm'
                    color='primary.50'
                    cursor='pointer'
                    onClick={() => {
                        navigate('/')
                    }}
                    transform='rotate(180deg)'
                />

                <HStack gap='2em'>
                    {/* <NavLink to='/admin/movies' active={navLinkActiveStyles}>Films</NavLink>
                    <NavLink to='/' active={navLinkActiveStyles}>Acteurs</NavLink>
                    <NavLink to='/' active={navLinkActiveStyles}>Réalisateurs</NavLink> */}
                </HStack>

                <ProfileButton />

            </HStack>

            {/* Content */}
            {props.children}

        </VStack>
    </AuthGuard>

}