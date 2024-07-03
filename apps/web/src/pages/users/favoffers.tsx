import React from 'react';
import {
    Box,
    Flex,
    Icon,
    Stack,
    Text,
    Image
} from '@chakra-ui/react';
import { Link } from '@glowjob/web/router';
import { FaUser, FaClipboardList, FaSignOutAlt } from 'react-icons/fa';
import { ListJobsItemFav } from '../../components/modules'

const ListJobs = [{"Titre":"Développeur Front-end","Type":"CDI","DateDebut":"2024-07-01","DateFin":"2025-07-01","Entreprise":"Tech Innovators","Lieu":"Paris, France","Niveau":"Junior","Contact":"contact@techinnovators.com"},{"Titre":"Chef de Projet IT","Type":"CDD","DateDebut":"2024-08-15","DateFin":"2025-08-15","Entreprise":"InnoTech","Lieu":"Lyon, France","Niveau":"Senior","Contact":"recrutement@innotech.com"},{"Titre":"Data Scientist","Type":"Freelance","DateDebut":"2024-09-01","DateFin":"2025-09-01","Entreprise":"Data Solutions","Lieu":"Marseille, France","Niveau":"Intermédiaire","Contact":"hr@datasolutions.com"},{"Titre":"Designer UX/UI","Type":"Stage","DateDebut":"2024-07-15","DateFin":"2025-01-15","Entreprise":"Creative Minds","Lieu":"Bordeaux, France","Niveau":"Étudiant","Contact":"interns@creativeminds.com"}];

const ProfilePage: React.FC = () => {
    return (
        <Flex direction="column" height="100vh">
            <Flex flex="1">
                <Box 
                    width="30%" 
                    height="100%" 
                    backgroundColor="#2E0A37" 
                    padding="2rem" 
                    display="flex" 
                    flexDirection="column" 
                    justifyContent="space-between"
                >
                    <Stack spacing={10} width="100%">
                        <Link to="/users/profile">
                            <Box display="flex" alignItems="center" color="white" fontSize="2xl">
                                <Icon as={FaUser} marginRight="1rem" boxSize={8} />
                                <Text>
                                    Mes Informations
                                </Text>
                            </Box>
                        </Link>
                        <Link to="/users/favoffers">
                            <Box display="flex" alignItems="center" color="white" fontSize="2xl">
                                <Icon as={FaClipboardList} marginRight="1rem" color="#9A22B8" boxSize={8} />
                                <Text color="#9A22B8" as="span">
                                    Mes Offres Suivis
                                </Text>
                            </Box>
                        </Link>
                    </Stack>
                    <Box width="100%" marginTop="auto">
                        <Link to="/auth/login">
                            <Box display="flex" alignItems="center" color="white" fontSize="2xl">
                                <Icon as={FaSignOutAlt} marginRight="1rem" boxSize={8} />
                                <Text>Déconnexion</Text>
                            </Box>
                        </Link>
                    </Box>
                </Box>
                <Box 
                    flex="1" 
                    backgroundColor="#521262" 
                    padding="2rem"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                >
                    <Box width="50%" display="flex" justifyContent="center" alignItems="center" mb="1rem">
                        <Image
                            src='/logoGlowjob.png'
                            alt='Logo Glowjob'
                            objectFit='contain'
                            width='75%'
                        />  
                    </Box>
                    <Flex width="100%" flex="1" justifyContent="center" alignItems="center">
                        <Box width="100%"> 
                            {ListJobs.map((job, index: number) => (
                                <ListJobsItemFav key={index} job={job} />
                            ))}
                        </Box>
                    </Flex>
                </Box>
            </Flex>
        </Flex>
    );
}

export default ProfilePage;
