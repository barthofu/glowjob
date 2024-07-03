import React from 'react';
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Icon,
    Input,
    Stack,
    Text,
    Image
} from '@chakra-ui/react';
import { Link } from '@glowjob/web/router';
import { FaUser, FaClipboardList, FaSignOutAlt } from 'react-icons/fa';
// import Header from './Header'  // Remplacez par le chemin correct vers votre composant Header

const ProfilePage: React.FC = () => {
    return (
        <Flex direction="column" height="100vh">
            {/* <Header /> */}
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
                                <Icon as={FaUser} marginRight="1rem" color="#9A22B8" boxSize={8} />
                                <Text color="#9A22B8" as="span">
                                    Mes Informations
                                </Text>
                            </Box>
                        </Link>
                        <Link to="/users/profile">
                            <Box display="flex" alignItems="center" color="white" fontSize="2xl">
                                <Icon as={FaClipboardList} marginRight="1rem" boxSize={8} />
                                <Text>Mes Offres Suivis</Text>
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
                        <Box width="75%">
                            <Stack spacing={4}>
                                <Flex width="100%" justifyContent="space-between">
                                    <FormControl flex="1" marginRight="1rem">
                                        <FormLabel color="white">Nom</FormLabel>
                                        <Input placeholder="Nom" color="white" _placeholder={{ color: 'white' }} />
                                    </FormControl>
                                    <FormControl flex="1" marginLeft="1rem">
                                        <FormLabel color="white">Prénom</FormLabel>
                                        <Input placeholder="Prénom" color="white" _placeholder={{ color: 'white' }} />
                                    </FormControl>
                                </Flex>
                                <Flex width="100%" justifyContent="space-between">
                                    <FormControl flex="1" marginRight="1rem">
                                        <FormLabel color="white">Mail</FormLabel>
                                        <Input placeholder="Mail" color="white" _placeholder={{ color: 'white' }} />
                                    </FormControl>
                                    <FormControl flex="1" marginLeft="1rem">
                                        <FormLabel color="white">Mot de Passe</FormLabel>
                                        <Input type="password" placeholder="Mot de Passe" color="white" _placeholder={{ color: 'white' }} />
                                    </FormControl>
                                </Flex>
                                <Box display="flex" justifyContent="center" mt="2rem">
                                    <Button
                                        w='75%'
                                        variant='solid'
                                        type='submit'
                                        backgroundColor="#2E0A37"
                                        color="white"
                                    >
                                        Mettre à jour
                                    </Button>
                                </Box>
                            </Stack>
                        </Box>
                    </Flex>
                </Box>
            </Flex>
        </Flex>
    );
}

export default ProfilePage;
