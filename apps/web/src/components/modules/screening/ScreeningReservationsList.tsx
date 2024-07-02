import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { ReservationWithUser } from '@cinestia/contract'
import { ScreeningModel } from '@cinestia/prisma'
import { dayjs } from '@cinestia/utils'
import { Table, useTableQueryHelper } from '@cinestia/web/ui'
import { createColumnHelper } from '@tanstack/react-table'
import React from 'react'
import { z } from 'zod'
import { queryClient } from '../../../core/libs/http'

const columnHelper = createColumnHelper<z.infer<typeof ReservationWithUser>>()

const columns = [
    columnHelper.accessor('user.lastName', {
        header: 'Nom',
    }),
    columnHelper.accessor('user.firstName', {
        header: 'Prénom',
    }),
    columnHelper.accessor('user.email', {
        header: 'Email',
    }),
    columnHelper.accessor('amount', {
        header: 'Nb. places',
    }),
    columnHelper.accessor('createdAt', {
        header: 'Date de réservation',
        cell: (cell) => dayjs(cell.row.original.createdAt).format('DD/MM/YYYY [à] HH:MM')
    }),
]

type ScreeningReservationsListProps = {
    screening: z.infer<typeof ScreeningModel>
}

export const ScreeningReservationsList: React.FC<ScreeningReservationsListProps> = (props) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const { pagination, setPagination, fetchDataOptions } = useTableQueryHelper()
    const { data, isLoading } = queryClient.reservations.getReservations.useQuery(['reservations', props.screening.id], {
        query: {
            ...fetchDataOptions,
            screeningId: String(props.screening.id)
        }
    })

    return <>
        <Button
            onClick={onOpen}
            colorScheme='purple'
            size='xs'
            fontWeight='regular'
        >
            Réservations
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent
                background='primary.90'
                minW='50vw'
                minH='60%'
            >
                <ModalHeader>Réservations pour la séance du {dayjs(props.screening.startTime).format('DD/MM/YYYY à HH:MM')}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>

                    <Table<z.infer<typeof ReservationWithUser>>
                        columns={columns}
                        data={data?.body}
                        loading={isLoading}
                        pagination={{
                            state: pagination,
                            setState: setPagination,
                        }}
                    />

                </ModalBody>
            </ModalContent>
        </Modal>
    </>
}