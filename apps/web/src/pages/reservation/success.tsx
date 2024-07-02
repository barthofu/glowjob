import { Button, Flex, Text } from '@chakra-ui/react'
import { useNavigate } from '@cinestia/web/router'
import React from 'react'
import { LoaderFunction, useLoaderData } from 'react-router-typesafe'
import { DefaultLayout } from '../../components/layouts'
import { client } from '../../core/libs/http'

export const Loader = (async ({ request }) => {
    const checkoutId = new URL(request.url).searchParams.get('checkout_id')
    if (!checkoutId) throw new Error('`checkout_id` is required')

    const reservation = await client.reservations.validateReservation({
        body: {
            checkoutId: checkoutId
        }
    })
    if (reservation.status !== 200) throw new Error('Reservation is not validated')
    return reservation.body
}) satisfies LoaderFunction

export const Catch = ((props: any) => {
    return <div>Erreur</div>
})

const SuccessReservationPage: React.FC = () => {

    const reservation = useLoaderData<typeof Loader>()
    const navigate = useNavigate()

    return <DefaultLayout
        title='Réservation validée'
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
                Votre réservation n°{reservation?.id} a bien été validée !
            </Text>
            <Text>
                Un mail de confirmation vous a été envoyé.
            </Text>
            <Text>
                Vous pouvez consulter vos réservations dans votre espace personnel.
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

export default SuccessReservationPage