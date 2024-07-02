import { Button, FormControl, HStack, Heading, Input, Text, VStack } from '@chakra-ui/react'
import { AuthService } from '@cinestia/web/auth'
import { useNavigate } from '@cinestia/web/router'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { AuthLayout } from '../../components/layouts'
import { client } from '../../core/libs/http'

const authFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, { message: "Password must be atleast 6 characters" })
})

type AuthFormSchema = z.infer<typeof authFormSchema>

const LoginPage: React.FC = () => {

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm<AuthFormSchema>({
        resolver: zodResolver(authFormSchema)
    })

    const onSubmit: SubmitHandler<AuthFormSchema> = ({ email, password }) => {

        client.auth.login({ body: { username: email, password } })
            .then(data => {
                if (data.status === 200) {
                    AuthService.login(data.body.access_token)
                    navigate('/')
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <AuthLayout
            title='Se connecter'
        >
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                <HStack w='100%' justifyContent='center'>
                    <VStack w='50%' spacing='2em'>

                        <Heading as='h1' fontSize='1.5rem'>
                            Se connecter
                        </Heading>

                        <FormControl isRequired>
                            <Input variant='flushed' placeholder="Email" {...register('email', { required: true })} />
                        </FormControl>

                        <FormControl isRequired>
                            <Input variant='flushed' type='password' placeholder="Mot de passe" {...register('password', { required: true })} />
                        </FormControl>

                        <VStack spacing='2em'>
                            <Button
                                w='100%'
                                // variant='primary'
                                mt='1rem'
                                isLoading={isSubmitting}
                                type='submit'
                            >
                                Se connecter
                            </Button>
                            <Text fontSize='sm'>
                                Vous n'avez pas de compte ? <Text as='span' color='primary.50' cursor='pointer' onClick={() => navigate('/auth/register')}>S'inscrire</Text>
                            </Text>
                        </VStack>
                    </VStack>
                </HStack>
            </form>
        </AuthLayout>
    )
}

export default LoginPage
