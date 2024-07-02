import { Box, Button } from '@chakra-ui/react'
import { ScreeningModel } from '@cinestia/prisma'
import { dayjs } from '@cinestia/utils'
import { DefaultTableCell, Table, createColumnMeta } from '@cinestia/web/ui'
import { createColumnHelper } from '@tanstack/react-table'
import React from 'react'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { queryClient } from '../../../core/libs/http'
import { ScreeningReservationsList } from './ScreeningReservationsList'

const columnHelper = createColumnHelper<z.infer<typeof ScreeningModel>>()

const columns = [
    columnHelper.accessor('startTime', {
        header: 'Date / heure',
        cell: (cell) => (
            <DefaultTableCell {...cell}>{dayjs(cell.getValue()).format('YYYY-MM-DD[T]HH:MM')}</DefaultTableCell>
        ),
        meta: createColumnMeta({
            editable: true,
            type: 'datetime-local',
        })
    }),
    columnHelper.accessor('room', {
        header: 'Salle',
        meta: createColumnMeta({
            editable: true,
            type: 'number',
        })
    }),
    columnHelper.accessor('roomCapacity', {
        header: 'Places totales',
    }),
    columnHelper.accessor('availableSeats', {
        header: 'Places restantes',
    }),
    columnHelper.accessor('handicapFriendly', {
        header: 'Handicap',
        meta: createColumnMeta({
            editable: true,
            type: 'boolean',
        })
    }),
    columnHelper.accessor('language', {
        header: 'Langue',
        meta: createColumnMeta({
            editable: true,
            type: 'text',
        })
    }),
    columnHelper.display({
        header: 'Réservations',
        cell: (cell) => <ScreeningReservationsList screening={cell.row.original} />
    })
]

type ScreeningsTableProps = {
    screenings?: z.infer<typeof ScreeningModel>[]
    movieId: number
    refetch: () => void
    isLoading: boolean
}

export const ScreeningsTable: React.FC<ScreeningsTableProps> = (props) => {

    return (
        <Table<z.infer<typeof ScreeningModel>>
            columns={columns}
            data={props.screenings}
            loading={props.isLoading}
            editable={{
                enabled: true,
                onRowUpdate: (row, newData) => {
                    queryClient.screenings.updateScreening.mutation({
                        params: { id: String(row.original.id) },
                        body: { data: newData }
                    })
                        .then(({ status }) => {
                            if (status === 200) {
                                props.refetch()
                                toast.success('Séance mise à jour')
                            } else throw new Error()
                        })
                        .catch(() => toast.error('Erreur lors de la mise à jour de la séance'))
                }
            }}
            rowSelection={{
                enabled: true,
                selectionActionComponent: ({ checkedItems, resetSelection }) =>
                    <Box>
                        <Button
                            size='sm'
                            colorScheme='red'
                            borderRadius='4px'
                            variant='solid'
                            onClick={async () => {
                                queryClient.screenings.bulkDeleteScreenings
                                    .mutation({
                                        body: checkedItems.map((item) => String(item.original.id)),
                                    })
                                    .then(({ status }) => {
                                        if (status === 200) {
                                            resetSelection()
                                            props.refetch()
                                            toast.success('Séances supprimés avec succès')
                                        } else throw new Error()
                                    })
                                    .catch(() => toast.error('Erreur lors de la suppression des séances'))
                            }}
                        >
                            Supprimer
                        </Button>
                    </Box>
            }}
            newRow={() => {
                queryClient.screenings.createScreening.mutation({
                    body: {
                        data: {
                            startTime: new Date(),
                            movie: { connect: { id: props.movieId } },
                            room: 1,
                            roomCapacity: 100,
                            availableSeats: 100,
                            handicapFriendly: false,
                            language: 'FR',
                        }
                    }
                })
                    .then(({ status }) => {
                        if (status === 201) {
                            props.refetch()
                            toast.success('Séance créée')
                        } else throw new Error()
                    })
                    .catch(() => toast.error('Erreur lors de la création de la séance'))
            }}
            styling={{
                table: {
                    variant: 'simple',
                    colorScheme: 'primary',
                },
            }}
        />
    )
}