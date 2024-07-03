import React from 'react'
import { DefaultLayout } from '../../components/layouts'
import { Box, Flex, Image, Text } from '@chakra-ui/react'

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

const JobDetailsPage: React.FC = () => {
    return (
        <DefaultLayout
            title='GlowJob'
            fadedImage='https://picsum.photos/100/100.webp'
            queryStatus={200}
        >
            <Flex
                alignItems='center'
                justifyContent='space-between'
                gap="10%"
                padding='5%'
                color="white"
                flexWrap="wrap"
            >
                <Image 
                    src='https://picsum.photos/500/500.webp' 
                    borderRadius="10px" 
                    boxShadow="lg" 
                    maxWidth="40%" 
                    marginBottom={{ base: "20px", md: "0" }}
                />
                <Flex 
                    direction="column"
                    flex="1"
                >
                    <Text
                        as='u'
                        fontSize='2xl'
                        padding='10px'
                        width="fit-content"
                        marginBottom="20px"
                    >
                        {job.Titre}
                    </Text>
                    <Flex
                        direction="column"
                        gap="10px"
                    >
                        <Text>Type: {job.Type}</Text>
                        <Text>Date de début: {job.DateDebut}</Text>
                        <Text>Date de fin: {job.DateFin}</Text>
                        <Text>Entreprise: {job.Entreprise}</Text>
                        <Text>Lieu: {job.Lieu}</Text>
                        <Text>Niveau: {job.Niveau}</Text>
                    </Flex>
                </Flex>
            </Flex>
        </DefaultLayout>
    )
}

export default JobDetailsPage
