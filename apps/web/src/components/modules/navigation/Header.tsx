import React from 'react';
import { Flex, Input, Image, Box, Text } from '@chakra-ui/react';
import { GoChevronDown } from "react-icons/go";

const Header: React.FC = () => {
    return (
        <Flex
            justifyContent="space-between"
            alignItems="center"
            backgroundColor="#4B006E"
            padding="10px 20px"
            boxShadow="md"
        >
            <Image 
                width="100px"
                src="/logoGlowjob.png"
                alt="Glowjob logo"
            />

            <Input 
                variant="filled" 
                placeholder="Search" 
                borderRadius="23px"
                backgroundColor="white"
                width="30%"
                margin="0 20px"
                color="white"
            />

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
        </Flex>
    );
}

export default Header;
