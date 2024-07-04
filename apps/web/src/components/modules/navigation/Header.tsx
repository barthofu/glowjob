import React from 'react';
import { Flex, Input, Image, Box, Text } from '@chakra-ui/react';
import { GoChevronDown } from "react-icons/go";
import { Link, useNavigate } from '@glowjob/web/router'

const Header: React.FC = () => {

    const navigate = useNavigate()

    return (
        <Flex
            justifyContent="space-between"
            alignItems="center"
            backgroundColor="#521262"
            padding="10px 20px"
            boxShadow="md"
            position="fixed"
            top="0"
            width="100%"
            zIndex="1000"
        >
            <Image
                width="100px"
                src="/logoGlowjob.png"
                alt="Glowjob logo"
                onClick={() => navigate('/')}
            />

            <Input
                variant="outline"
                placeholder="Recherche une offre"
                borderRadius="23px"
                backgroundColor="white"
                width="30%"
                margin="0 20px"
                borderColor="gray.400"
                focusBorderColor="gray.700"
            />

            <Link to="/users/profile">
                <Box display="flex" alignItems="center">
                    <Flex
                        textAlign="right"
                        direction="column"
                        marginRight="10px"
                        alignItems="center"
                    >
                        <Text fontSize="md" fontWeight="bold" color="white">Nom Prenom</Text>
                        <Text fontSize="sm" color="white">nom.prenom@gmail.com</Text>
                    </Flex>
                    <GoChevronDown color="white" />
                </Box>
            </Link>

        </Flex>
    );
}

export default Header;
