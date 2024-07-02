import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { dayjs } from '@cinestia/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { queryClient } from '../../../core/libs/http'
import { ScreeningModel } from '@cinestia/prisma'

const reservationFormSchema = z.object({
    amount: z.number(),
})

type ReservationFormSchema = z.infer<typeof reservationFormSchema>

type ReservationModalProps = {
    screening: z.infer<typeof ScreeningModel>
    disclosure: ReturnType<typeof useDisclosure>
}

export const ReservationModal: React.FC<ReservationModalProps> = (props) => {

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<ReservationFormSchema>({
        resolver: zodResolver(reservationFormSchema)
    })

    const onSubmit: SubmitHandler<ReservationFormSchema> = (data) => {

        queryClient.reservations.createReservation.mutation({
            body: {
                screeningId: props.screening.id,
                amount: data.amount
            }
        })
            .then(({ status, body }) => {
                if (status === 201) window.open(body.checkoutUrl, '_self')
                else if (status === 400) toast.error((body as any).message)
                else if (status === 401) toast.error('Vous devez être connecté pour réserver')
            })
            .catch(() => toast.error('Une erreur est survenue'))
    }

    return (
        <Modal isOpen={props.disclosure.isOpen} onClose={props.disclosure.onClose}>
            <ModalOverlay />
            <ModalContent background='primary.90'>
                <ModalHeader>
                    Séance du {dayjs(props.screening.startTime).format('DD/MM/YYYY')} à {dayjs(props.screening.startTime).format('HH:MM')}
                </ModalHeader>
                <ModalCloseButton />

                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalBody>
                        <label htmlFor='amount'>Nombre de places</label>
                        <Input
                            type='number'
                            defaultValue={1}
                            placeholder='Nombre de places'
                            {...register('amount', {
                                valueAsNumber: true,
                            })}
                            mt='1em'
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            type='submit'
                            colorScheme='purple'
                            mr={3}
                            isLoading={isSubmitting}
                        >
                            Réserver
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    )
}