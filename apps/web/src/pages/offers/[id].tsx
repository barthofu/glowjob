import React from 'react'
import { DefaultLayout } from '../../components/layouts'
import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { LoaderFunction, useLoaderData } from 'react-router-typesafe'
import { fetchFindById } from '@glowjob/openapi'

const job = {
    Titre: 'Développeur Front-end',
    Type: 'CDI',
    DateDebut: '2024-07-01',
    DateFin: '2025-07-01',
    Entreprise: 'Tech Innovators',
    Lieu: 'Paris, France',
    Niveau: 'Junior',
    Contact: 'contact@techinnovators.com',
}

export const Loader = (async ({ params }) => {
    if (!params.id) throw new Error('No id provided')

    return fetchFindById({ pathParams: { id: params.id }})
}) satisfies LoaderFunction

const JobDetailsPage: React.FC = () => {

    const offer = useLoaderData<typeof Loader>()

    return (
        <DefaultLayout
            title={'test'}
            fadedImage=''
            queryStatus={200}
        >
            <Flex
                alignItems='center'
                justifyContent='space-between'
                gap="10%"
                padding='5%'
                flexWrap="wrap"
            >
                <Flex 
                    direction="column"
                    flex="1"
                >
                    <Text
                        fontSize='2xl'
                        width="fit-content"
                        marginBottom="20px"
                        fontWeight={600}
                    >
                        {offer.intitule}
                    </Text>
                    <Flex
                        direction="column"
                        gap="10px"
                    >
                        <Text>Type: {job.Type}</Text>
                        <Text>Entreprise: {offer.entreprise?.nom}</Text>
                        <Text>Lieu: {offer.lieuTravail?.libelle}</Text>
                        <Text>Niveau: {job.Niveau}</Text>
                        <Text>{offer.description}</Text>
                    </Flex>
                </Flex>
            </Flex>
        </DefaultLayout>
    )
}

export default JobDetailsPage
