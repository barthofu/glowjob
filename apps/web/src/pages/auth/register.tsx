import { Button, Flex, FormControl, FormLabel, Heading, Input, Image, Text } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card } from '@glowjob/ui'
import { Link, useNavigate } from '@glowjob/web/router'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

const authFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    firstName: z.string().nonempty({ message: "First name is required" }),
    lastName: z.string().nonempty({ message: "Last name is required" }),
    age: z.number().min(18, { message: "You must be at least 18 years old" })
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

    const onSubmit: SubmitHandler<AuthFormSchema> = ({ email, password, firstName, lastName, age }) => {
        const userData = { email, password, firstName, lastName, age }
        // Appel à l'API pour l'inscription (remplacez cette partie avec votre logique d'inscription)
        // AuthService.login(userData.email, userData.password, userData.firstName, userData.lastName, userData.age)
        console.log(userData)
        navigate('/')  // Redirection vers la page de connexion après inscription
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
                        <FormLabel>Email</FormLabel>
                        <Input placeholder="Email" {...register('email', { required: true })} />
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
                        <Input type='number' placeholder="Âge" {...register('age', { required: true })} />
                    </FormControl>

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
