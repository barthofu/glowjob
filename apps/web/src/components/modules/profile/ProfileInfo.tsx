import { Button, Flex, FormControl, FormLabel, Input, Select, VStack } from '@chakra-ui/react'
import { UserWithReservations } from '@cinestia/contract'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { client } from '../../../core/libs/http'

const patchUserFormSchema = z.object({
    firstName: z.string().min(3, { message: "Name must be atleast 3 characters" }).optional(),
    lastName: z.string().min(3, { message: "Name must be atleast 3 characters" }).optional(),
    gender: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().min(6, { message: "Password must be atleast 6 characters" }).optional(),
})

type PatchUserFormSchema = z.infer<typeof patchUserFormSchema>

type ProfileProps = {
    user: z.infer<typeof UserWithReservations>
}

export const ProfileInfo: React.FC<ProfileProps> = ({ user }) => {

    console.log(user)

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<PatchUserFormSchema>({
        resolver: zodResolver(patchUserFormSchema)
    })

    const onSubmit: SubmitHandler<PatchUserFormSchema> = ({ firstName, lastName, gender, email, password }) => {
        client.profiles.updateProfile({ body: { data: { firstName, lastName, gender, email } }, params: { id: String(user.id) } })
            .then(data => {
                if (data.status === 200) {
                    toast.success('Compte créé avec succès')
                }
            })
            .catch(err => toast.error(err.message))
    }

    return <Flex
        padding={5}
        flexDirection="column"
        gap={5}
    >
        <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing='1em'>

                <FormControl >
                    <FormLabel>Email</FormLabel>
                    <Input
                        backgroundColor="commeTuVeux"
                        variant='filled'
                        type='email'
                        {...register('email', { value: user.email })} />
                </FormControl>

                <FormControl >
                    <FormLabel>Prénom</FormLabel>
                    <Input
                        backgroundColor="commeTuVeux"
                        variant='filled'
                        type='text'
                        {...register('firstName', { value: user.firstName })} />
                </FormControl>

                <FormControl >
                    <FormLabel>Nom</FormLabel>
                    <Input
                        backgroundColor="commeTuVeux"
                        variant='filled'
                        type='text'
                        {...register('lastName', { value: user.lastName })} />
                </FormControl>

                <FormControl >
                    <FormLabel>Genre</FormLabel>
                    <Select
                        background='commeTuVeux'
                        color='white'
                        {...register('gender')}
                        sx={{
                            '> option': {
                                background: 'commeTuVeux',
                                color: 'white',
                            },
                        }}
                    >
                        {/* @ts-ignore */}
                        <option {... (user.gender === "Homme" ? { selected: "selected" } : {})}>Homme</option>
                        {/* @ts-ignore */}
                        <option {... (user.gender === "Femme" ? { selected: "selected" } : {})}>Femme</option>
                        {/* @ts-ignore */}
                        <option {... (user.gender === "Autre ..." ? { selected: "selected" } : {})}>Autre ...</option>
                    </Select>
                </FormControl>
            </VStack>

            <Button
                variant='primary'
                mt='2em'
                isLoading={isSubmitting}
                type='submit'
                border="1px solid white"
            >
                Modifier
            </Button>
        </form>
    </Flex>
}