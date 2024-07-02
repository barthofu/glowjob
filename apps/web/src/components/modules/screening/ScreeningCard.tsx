import { Box, Flex, HStack, Icon, Text, Tooltip, useDisclosure } from '@chakra-ui/react'
import { ScreeningModel } from '@cinestia/prisma'
import { dayjs } from '@cinestia/utils'
import React from 'react'
import { BiHandicap } from 'react-icons/bi'
import { z } from 'zod'
import { Card } from '../../shared'
import { ReservationModal } from '../reservation/ReservationModal'

type ScreeningCardProps = {
    screening: z.infer<typeof ScreeningModel>
    movieDuration: number
}

export const ScreeningCard: React.FC<ScreeningCardProps> = (props) => {

    const disclosure = useDisclosure()

    const leftSeats = props.screening.roomCapacity - props.screening.availableSeats

    return <>
        <Card
            disabled={!leftSeats}
            p='.5em 1em'
            minWidth='10em'
            width='10em'
            height='5em'
            gap='0'
            center={true}
            fontSize='sm'
            cursor='pointer'
            transition='background-color .2s ease-in-out'
            _hover={{
                backgroundColor: 'primary.50'
            }}
        >
            <Tooltip label={leftSeats === 0 ? 'Complet' : `${leftSeats} places disponibles`}>
                <HStack
                    alignItems='flex-start'
                    justifyContent='space-around'
                    onClick={leftSeats ? disclosure.onOpen : undefined}
                >
                    <Text>{props.screening.language?.slice(0, 2)}</Text>
                    <Flex flexDir='column' alignItems='center' justifyContent='flex-start'>
                        <Text fontSize='1.4em' fontWeight='bold'>{dayjs(props.screening.startTime).format('HH:MM')}</Text>
                        <Text fontSize='.9em' opacity='.75'>(fin {dayjs(props.screening.startTime).add(props.movieDuration, 'minute').format('HH:MM')})</Text>
                    </Flex>
                    <Box>{props.screening.handicapFriendly && <Icon as={BiHandicap} />}</Box>
                </HStack>
            </Tooltip>
        </Card>

        <ReservationModal screening={props.screening} disclosure={disclosure} />
    </>
}