import { Button, FormControl, HStack, Heading, Input, Select, VStack, Text } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { AuthLayout } from '../../components/layouts'
import { client } from '../../core/libs/http'

const registerFormSchema = z.object({
    firstName: z.string().min(3, { message: "Name must be atleast 3 characters" }),
    lastName: z.string().min(3, { message: "Name must be atleast 3 characters" }),
    gender: z.string(),
    email: z.string().email(),
    password: z.string().min(6, { message: "Password must be atleast 6 characters" }),
    // confirmPassword: z.string().min(6, { message: "Password must be atleast 6 characters" }).refine(data => data === password, { message: "Passwords do not match" })
})

type RegisterFormSchema = z.infer<typeof registerFormSchema>

const RegisterPage: React.FC = () => {

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<RegisterFormSchema>({
        resolver: zodResolver(registerFormSchema)
    })

    const onSubmit: SubmitHandler<RegisterFormSchema> = ({ firstName, lastName, gender, email, password }) => {

        client.auth.register({ body: { firstName, lastName, gender, email, password, confirmPassword: password } })
            .then(data => {
                if (data.status === 201) {
                    toast.success('Compte créé avec succès')
                    navigate('/auth/login')
                }
            })
            .catch(err => toast.error(err.message))
    }

    return (
        <AuthLayout
            title="S'inscrire"
        >
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                <HStack w='100%' justifyContent='center'>
                    <VStack w='50%' spacing='2em'>

                        <Heading as='h1' fontSize='1.5rem'>
                            S'inscrire
                        </Heading>

                        <HStack gap='2em'>
                            <FormControl isRequired>
                                <Input variant='flushed' placeholder="Prénom" {...register('firstName', { required: true })} />
                            </FormControl>

                            <FormControl isRequired>
                                <Input variant='flushed' placeholder="Nom" {...register('lastName', { required: true })} />
                            </FormControl>
                        </HStack>

                        <FormControl isRequired>
                            <Input variant='flushed' placeholder="Email" {...register('email', { required: true })} />
                        </FormControl>

                        <FormControl>
                            <Select
                                variant='flushed'
                                {...register('gender', { required: true })}
                            >
                                <option>Homme</option>
                                <option>Femme</option>
                                <option>Autre</option>
                            </Select>
                        </FormControl>

                        <FormControl isRequired>
                            <Input variant='flushed' type='password' placeholder="Mot de passe" {...register('password', { required: true })} />
                        </FormControl>

                        <Button
                            w='100%'
                            mt='1rem'
                            isLoading={isSubmitting}
                            type='submit'
                        >
                            S'inscrire
                        </Button>

                        <Text fontSize='sm'>
                            Vous avez déjà un compte ? <Text as='span' color='primary.50' cursor='pointer' onClick={() => navigate('/auth/login')}>Se connecter</Text>
                        </Text>
                    </VStack>
                </HStack>
            </form>
        </AuthLayout>
    )
}

export default RegisterPage
