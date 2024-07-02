import { Button, Icon, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/react'
import { randomColorFromString } from '@cinestia/utils'
import { AuthService } from '@cinestia/web/auth'
import { Link } from '@cinestia/web/router'
import React from 'react'
import { BsFillGearFill, BsPerson } from 'react-icons/bs'
import { MdAdminPanelSettings } from 'react-icons/md'

type ProfileButtonProps = {}

export const ProfileButton: React.FC<ProfileButtonProps> = (props) => {

    const user = AuthService.getPayload(),
          isAdmin = AuthService.isAdmin()

    if (user) return (
        <Menu>
            <MenuButton
                position='relative'
                width='3em'
                height='3em'
                borderColor='gray.200'
                backgroundColor={`${randomColorFromString(`${user.firstName} ${user.lastName}`)}19`}
                borderRadius='50px'
                boxShadow='0 4px 30px rgba(0, 0, 0, 0.1)'
                backdropFilter='blur(4.8px)'
                border='1px solid rgba(255, 255, 255, 0.22)'
            >
                {user.firstName.at(0)?.toUpperCase()}{user.lastName.at(0)?.toUpperCase()}
                {isAdmin && <Icon 
                    as={BsFillGearFill}
                    position='absolute'
                    bottom='0em'
                    right='-0.25em'
                />}
            </MenuButton>

            <MenuList
                borderColor='gray.200'
                backgroundColor='rgba(0, 0, 0, 0.18)'
                borderRadius='16px'
                boxShadow='0 4px 30px rgba(0, 0, 0, 0.1)'
                backdropFilter='blur(4.8px)'
                border='1px solid rgba(255, 255, 255, 0.22)'
                // transform='translateX(-80%) !important'
            >
                <Link to='/auth/me'>
                    <MenuItem bg='transparent' _hover={{ fontWeight: 'bolder' }}>
                        <Icon as={BsPerson} mr='1em' />
                        Mon profil
                    </MenuItem>
                </Link>

                {isAdmin && (
                    <Link to='/admin/movies'>
                        <MenuItem bg='transparent' _hover={{ fontWeight: 'bolder' }}>
                            <Icon as={MdAdminPanelSettings} mr='1em' />
                            Dashboard
                        </MenuItem>
                    </Link>
                )}

                <MenuDivider />
                
                <Link to='/auth/logout'>
                    <MenuItem color='red' bg='transparent' _hover={{ fontWeight: 'bolder' }}>
                        <Icon as={BsPerson} mr='1em' />
                        Se déconnecter
                    </MenuItem>
                </Link>
            </MenuList>
        </Menu>
    )
    else return (
        <Link to='/auth/login'>
            <Button
                backgroundColor='primary.50'
                size='sm'
            >
                Se connecter
            </Button>
        </Link>
    )

}