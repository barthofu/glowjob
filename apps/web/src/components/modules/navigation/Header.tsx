import React from 'react';
import {Box, Flex, Image, Text} from '@chakra-ui/react';
import {GoChevronDown} from "react-icons/go";
import {Link} from '@glowjob/web/router'
import {SearchBar} from '../search/SearchBar';
import {useNavigate} from 'react-router-dom';

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

            <SearchBar />

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
