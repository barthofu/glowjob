import { Button, Flex, FormControl, FormLabel, Heading, Input, Image, Text, Select } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card } from '@glowjob/ui'
import { Link, useNavigate } from '@glowjob/web/router'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { axiosInstance } from '@glowjob/openapi'
import { AuthService } from '@glowjob/web/auth'

const authFormSchema = z.object({
    login: z.string(),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    age: z.string(),
    // user_type: z.enum(['student', 'company'], { message: "You must select a user type" })
})

type AuthFormSchema = z.infer<typeof authFormSchema>

const SignupPage: React.FC = () => {

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm<AuthFormSchema>({
        resolver: zodResolver(authFormSchema)
    })

    const onSubmit: SubmitHandler<AuthFormSchema> = ({ login, password, firstName, lastName, age, user_type }) => {
        const userData = { login, password, firstName, lastName, age, user_type}
        // Appel à l'API pour l'inscription (remplacez cette partie avec votre logique d'inscription)
        // AuthService.login(userData.email, userData.password, userData.firstName, userData.lastName, userData.age)
        console.log(userData)
        axiosInstance.post('/sign-up', {
            ...userData
        }).then((data: any) => {
            navigate('/auth/login')
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
            flexDirection={{ base: 'column', md: 'row' }}
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
                    <Heading as='h1' fontSize='1.5rem'>
                        S'inscrire
                    </Heading>

                    <FormControl isRequired isInvalid={false}>
                        <FormLabel>Login</FormLabel>
                        <Input placeholder="Login" {...register('login', { required: true })} />
                    </FormControl>

                    <FormControl isRequired isInvalid={false}>
                        <FormLabel>Mot de passe</FormLabel>
                        <Input type='password' placeholder="Mot de passe" {...register('password', { required: true })} />
                    </FormControl>

                    <FormControl isRequired isInvalid={false}>
                        <FormLabel>Nom</FormLabel>
                        <Input placeholder="Nom" {...register('lastName', { required: true })} />
                    </FormControl>

                    <FormControl isRequired isInvalid={false}>
                        <FormLabel>Prénom</FormLabel>
                        <Input placeholder="Prénom" {...register('firstName', { required: true })} />
                    </FormControl>

                    <FormControl isRequired isInvalid={false}>
                        <FormLabel>Âge</FormLabel>
                        <Input placeholder="Âge" {...register('age', { required: true })} />
                    </FormControl>

                    {/* <FormControl isInvalid={false}>
                        <Select>
                            <option value='student'>Un étudiant</option>
                            <option value='company'>Une entreprise</option>
                        </Select>
                    </FormControl> */}

                    <Button
                        w='100%'
                        variant='primary'
                        mt='1rem'
                        isLoading={isSubmitting}
                        type='submit'
                    >
                        S'inscrire
                    </Button>

                    <Text mt='1rem' textAlign='center' fontSize='sm'>
                        Tu as déjà un compte ?{" "}
                        <Link to="/auth/login">
                            <Text color="blue.500" as="span">
                                Se connecter
                            </Text>
                        </Link>
                    </Text>
                </Card>
            </form>
        </Flex>
    )
}

export default SignupPage
