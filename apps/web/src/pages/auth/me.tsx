import { Divider, Flex, HStack, Spinner, Text, VStack } from '@chakra-ui/react'
import { AuthGuard } from '@cinestia/web/auth'
import React from 'react'
import { DefaultLayout } from '../../components/layouts'
import { ProfileInfo, UserReservations } from '../../components/modules'
import { queryClient } from '../../core/libs/http'

const ProfilePage: React.FC = () => {

    const { data, isLoading } = queryClient.auth.me.useQuery(['user-profile'])

    return <AuthGuard>
        <DefaultLayout
            title='Mon profil'
        >
            <Flex w='100%' h='100%' alignItems='center'>
                <HStack w='70vw' h='60vh' justifyContent='space-around' >
                    {isLoading && <Spinner />}
                    {data?.status === 200 && <>
                        <VStack justifyContent='flex-start' h='100%'>
                            <Text fontSize='2em'>Profil</Text>
                            <ProfileInfo user={data.body} />
                        </VStack>
                        <Divider orientation="vertical" h='50%' />
                        <VStack justifyContent='flex-start' h='100%' spacing='2em' overflowY='scroll' overflowX='hidden' pr='1em'>
                            <Text fontSize='2em'>Mes réservations</Text>
                            <UserReservations reservations={data.body.reservations} />
                        </VStack>
                    </>}
                </HStack>
            </Flex>
        </DefaultLayout>
    </AuthGuard>

}

export default ProfilePage