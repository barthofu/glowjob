import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { Link } from '@glowjob/web/router';
import React from 'react';
import { SearchBar } from '../search/SearchBar';

const Header: React.FC = () => {

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
            <Link to="/">
                <Image
                    width="100px"
                    src="/logoGlowjob.png"
                    alt="Glowjob logo"
                />
            </Link>

            <SearchBar />

            <Link to="/users/profile">
                <Box display="flex" alignItems="center">
                    <Flex
                        textAlign="right"
                        direction="column"
                        marginRight="10px"
                        alignItems="center"
                    >
                        <Text fontSize="md" fontWeight="bold" color="white">Test Test</Text>
                        <Text fontSize="sm" color="white">test.test@gmail.com</Text>
                    </Flex>
                </Box>
            </Link>

        </Flex>
    );
}

export default Header;
