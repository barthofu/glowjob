import { Button, Flex, FormControl, FormLabel, Heading, Input, Image, Text } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card } from '@glowjob/ui'
import { AuthService } from '@glowjob/web/auth'
import { Link, useNavigate } from '@glowjob/web/router'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { axiosInstance } from '@glowjob/openapi'

const authFormSchema = z.object({
    login: z.string(),
    password: z.string().min(6, { message: "Password must be at least 6 characters" })
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

    const onSubmit: SubmitHandler<AuthFormSchema> = ({ login, password }) => {
        axiosInstance.post('/login', {
            login: login,
            password: password,
        }).then((data: any) => {
            AuthService.login(data.token)
            console.log(AuthService.getToken())
            navigate('/')
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <Flex
            width='100vw'
            height='100vh'
            justifyContent='center'
            alignItems='center'
            backgroundColor='#521262'
        >
            <Flex flex='1' justifyContent='center' alignItems='center' overflow='hidden'>
                <Image
                    src='/logoGlowjob.png'
                    alt='Logo Glowjob'
                    objectFit='contain'
                    maxH='70%'
                    width='70%'
                />
            </Flex>
            <form onSubmit={handleSubmit(onSubmit)} style={{ flex: '1', padding: '2rem' }}>
                <Card
                    center={true}
                    width='100%'
                    height='100%'
                    padding='2rem'
                >
                    <Heading as='h1'
                        fontSize='1.5rem'
                    >
                        Se connecter
                    </Heading>

                    <FormControl isRequired isInvalid={false}>
                        <FormLabel>Login</FormLabel>
                        <Input placeholder="Login" {...register('login', { required: true })} />
                    </FormControl>

                    <FormControl isRequired isInvalid={false}>
                        <FormLabel>Mot de passe</FormLabel>
                        <Input type='password' placeholder="Mot de passe" {...register('password', { required: true })} />
                    </FormControl>

                    <Button
                        w='100%'
                        variant='primary'
                        mt='1rem'
                        isLoading={isSubmitting}
                        type='submit'
                    >
                        Se connecter
                    </Button>

                    <Text mt='1rem' textAlign='center' fontSize='sm'>
                        Tu n'as pas de compte ?{" "}
                        <Link to="/auth/register">
                            <Text color="blue.500" as="span">
                                Inscrit toi
                            </Text>
                        </Link>
                    </Text>
                </Card>
            </form>
        </Flex>
    )
}

export default LoginPage
