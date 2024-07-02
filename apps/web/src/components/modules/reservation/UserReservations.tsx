import { HStack, Image, Text, VStack } from '@chakra-ui/react'
import { ReservationWithScreening } from '@cinestia/contract'
import { dayjs } from '@cinestia/utils'
import React from 'react'
import { z } from 'zod'

type UserReservationsProps = {
    reservations: z.infer<typeof ReservationWithScreening>[]
}

export const UserReservations: React.FC<UserReservationsProps> = (props) => {

    return <VStack spacing='1em'>
        {props.reservations.map(reservation => {

            const screening = reservation.screening
            const movie = reservation.screening.movie

            return (
                <HStack key={reservation.id}
                    justifyContent='space-between'
                    w='100%'
                    spacing='3em'
                    background='primary.90'
                    padding='1em'
                    borderRadius='5px'
                >
                    <Image
                        src={movie.poster?.url}
                        alt={movie.title}
                        height='6em'
                        objectFit='cover'
                        borderRadius='5px'
                    />
                    <VStack>
                        <Text fontSize='1.2em' fontWeight='bold'>{movie.title}</Text>
                        <Text fontSize='.8em'>{dayjs(screening.startTime).format('DD/MM/YYYY à HH:MM')}</Text>
                        <Text fontSize='.8em'>Salle n°{screening.room}</Text>
                    </VStack>
                    <VStack>
                        <Text fontSize='1.2em'>{reservation.price / 100}€</Text>
                        <Text fontSize='.8em'>{reservation.amount} pl.</Text>
                    </VStack>
                </HStack>
            )
        })}
    </VStack>
}