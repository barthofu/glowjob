import { Box, Button, Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import { ListJobsItem } from '../components/modules';

const ListJobs = [{"Titre":"Développeur Front-end","Type":"CDI","DateDebut":"2024-07-01","DateFin":"2025-07-01","Entreprise":"Tech Innovators","Lieu":"Paris, France","Niveau":"Junior","Contact":"contact@techinnovators.com"},{"Titre":"Chef de Projet IT","Type":"CDD","DateDebut":"2024-08-15","DateFin":"2025-08-15","Entreprise":"InnoTech","Lieu":"Lyon, France","Niveau":"Senior","Contact":"recrutement@innotech.com"},{"Titre":"Data Scientist","Type":"Freelance","DateDebut":"2024-09-01","DateFin":"2025-09-01","Entreprise":"Data Solutions","Lieu":"Marseille, France","Niveau":"Intermédiaire","Contact":"hr@datasolutions.com"},{"Titre":"Designer UX/UI","Type":"Stage","DateDebut":"2024-07-15","DateFin":"2025-01-15","Entreprise":"Creative Minds","Lieu":"Bordeaux, France","Niveau":"Étudiant","Contact":"interns@creativeminds.com"}];

const HomePageOffer: React.FC = () => {
    const [isAlternate, setIsAlternate] = useState(false);

    const handleButtonClick = (value: boolean) => {
        setIsAlternate(value);
    };

    return (
        <Box>
            <Flex 
                marginTop="2%"
                justifyContent="space-evenly">
                <Button 
                    backgroundColor={isAlternate ? "#000000" : "#9a22b8"}
                    color="white"
                    border="2px solid white"
                    borderRadius="23px"
                    onClick={() => handleButtonClick(false)}
                >
                    Alternances/Stages
                </Button>
                <Button 
                    backgroundColor={isAlternate ? "#9a22b8" : "#000000"}
                    color="white"
                    border="2px solid white"
                    borderRadius="23px"
                    onClick={() => handleButtonClick(true)}
                >
                    Spontannées
                </Button>
            </Flex>

            <Box
                marginTop="2%"
                padding="2%"
                border="2px solid white"
                borderRadius="23px"
                minHeight="60vh"
            >
                {ListJobs.map((job, index: number) => (
                    <ListJobsItem key={index} job={job} />
                ))}
            </Box>
        </Box>
    );
}

export default HomePageOffer;
