import { Button, Flex, FormControl, FormLabel, Heading, Input, Image, Link, Text } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { fetchAuthTokenCreate } from '@glowjob/openapi'
import { Card } from '@glowjob/ui'
import { AuthService, useToken } from '@glowjob/web/auth'
import { useNavigate } from '@glowjob/web/router'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

const authFormSchema = z.object({
    email: z.string().email(),
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

    const onSubmit: SubmitHandler<AuthFormSchema> = ({ email, password }) => {

        fetchAuthTokenCreate({ body: { email, password } })
            .then(data => {
                AuthService.login(data.access, data.refresh)
                navigate('/')
            })
            .catch(err => console.log(err))
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
                    src='/logoGlowjob.png'  // Chemin relatif à partir de `public`
                    alt='Logo Glowjob'
                    objectFit='contain'
                    maxH='100%'
                    width='100%'
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
                        <FormLabel>Email</FormLabel>
                        <Input placeholder="Email" {...register('email', { required: true })} />
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
                        <Link href="/signup" color="blue.500">
                            Inscrit toi
                        </Link>
                    </Text>
                </Card>
            </form>
        </Flex>
    )
}

export default LoginPage