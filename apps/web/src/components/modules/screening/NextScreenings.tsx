import { HStack, Text, VStack } from '@chakra-ui/react'
import { ScreeningModel } from '@cinestia/prisma'
import { dayjs } from '@cinestia/utils'
import React from 'react'
import { z } from 'zod'
import { Card } from '../../shared'

type NextScreeningsProps = {
    screenings: z.infer<typeof ScreeningModel>[]
}

export const NextScreenings: React.FC<NextScreeningsProps> = (props) => {

    const nextScreenings = props.screenings
        .filter(screening => dayjs(screening.startTime).isAfter(dayjs()))
        .sort((a, b) => {
            return new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
        })
        .slice(0, 5)

    return <VStack gap='1em' alignItems='flex-start'>
        <Text color='secondary.50'>Prochaines séances</Text>
        <HStack>
            {nextScreenings.map(screening => (
                <Card
                    key={screening.id}
                    p='.5em 1em'
                    gap='0'
                    center={true}
                    fontSize='sm'
                >
                    <Text>{dayjs(screening.startTime).format('ddd D MMM')}</Text>
                    <Text>{dayjs(screening.startTime).format('HH:MM')}</Text>
                </Card>
            ))}
        </HStack>
    </VStack>
}