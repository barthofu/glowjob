import { Button, Flex, Text } from '@chakra-ui/react'
import { useNavigate } from '@cinestia/web/router'
import React, { useEffect } from 'react'
import { LoaderFunction, useLoaderData } from 'react-router-typesafe'
import { DefaultLayout } from '../../components/layouts'
import { client } from '../../core/libs/http'
import { toast } from 'react-toastify'

export const Loader = (async ({ request }) => {
    const checkoutId = new URL(request.url).searchParams.get('checkout_id')
    if (!checkoutId) throw new Error('`checkoutId` is required')

    const reservation = await client.reservations.cancelReservation({
        body: {
            checkoutId: checkoutId
        }
    })
    if (reservation.status !== 200) throw new Error('Reservation is not validated')
    return reservation.body
}) satisfies LoaderFunction

export const Catch = (() => {
    return <div>Erreur</div>
})

const CancelReservationPage: React.FC = () => {

    const reservation = useLoaderData<typeof Loader>()
    const navigate = useNavigate()

    useEffect(() => {
        toast.error('Votre réservation a été annulée', { toastId: 'cancel-reservation' })
    }, [])

    return <DefaultLayout
        title='Réservation annulée'
    >
        <Flex
            w='100%'
            h='80%'
            flexDir='column'
            alignItems='center'
            justifyContent='center'
            gap='1em'
        >
            <Text fontSize='1.5em' textAlign='center'>
                La réservation n°{reservation?.id} n'a pas pu aboutir !
            </Text>
            <Button
                onClick={() => navigate('/')}
                mt='2em'
                mb='-2em'
            >
                Retour à l'accueil
            </Button>
        </Flex>
    </DefaultLayout>
}

export default CancelReservationPage