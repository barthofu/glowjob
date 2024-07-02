import { HStack, Heading, Spinner, VStack } from '@chakra-ui/react'
import { dayjs } from '@cinestia/utils'
import { capitalize } from 'radash'
import React from 'react'
import { queryClient } from '../../../core/libs/http'
import { ScreeningCard } from './ScreeningCard'

type ScreeningsProps = {
    movie: {
        id: number
        duration: number
    }
}

export const Screenings: React.FC<ScreeningsProps> = (props) => {

    const { data, isLoading } = queryClient.screenings.get7NextDayScreening.useQuery(['screenings'], {
        params: { movieId: String(props.movie.id) }
    })

    return <VStack alignItems='flex-start' spacing='1em' w='100%'>
        {isLoading && <Spinner />}
        {data?.status === 200 && data.body
            .filter(day => day.screenings.length)
            .map((day, i) => (
                <VStack key={i} alignItems='flex-start' w='100%'>
                    <Heading as='h3' fontSize='xl'>{capitalize(dayjs(day.date).format('dddd D MMMM'))}</Heading>
                    <HStack spacing='1em' overflowX='scroll' overflowY='hidden' w='100%' pb='1em'>
                        {day.screenings.map(screening => (
                            <ScreeningCard key={screening.id} screening={screening} movieDuration={props.movie.duration} />
                        ))}
                    </HStack>
                </VStack>
            ))
        }
    </VStack>
}