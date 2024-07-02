import { Box, HStack, Icon, Image, Input, InputGroup, InputRightElement, Text, VStack, Spinner } from '@chakra-ui/react'
import { dayjs } from '@cinestia/utils'
import { Link } from '@cinestia/web/router'
import React, { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { queryClient } from '../../../core/libs/http'

type SearchProps = {}

export const Search: React.FC<SearchProps> = () => {

    const [isFocused, setIsFocused] = useState(false)
    const [search, setSearch] = useState('')
    const { data: movies, isFetching } = queryClient.movies.searchMovie.useQuery(['searchMovies' + search], {
        query: { search: search }
    }, {
        refetchInterval: 0,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })

    const shouldDisplayResults =
        search &&
        movies &&
        movies.status === 200 &&
        isFocused

    return <Box position='relative' w='20vw'>

        {/* Search input */}
        <InputGroup>
            <Input
                placeholder='Rechercher'
                type='text'
                value={search}
                onChange={e => setSearch(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => {
                    setTimeout(() => setIsFocused(false), 200)
                }}
                variant='outline'
                borderColor='gray.200'
                backgroundColor='rgba(0, 0, 0, 0.18)'
                borderRadius='16px'
                boxShadow='0 4px 30px rgba(0, 0, 0, 0.1)'
                backdropFilter='blur(4.8px)'
                border='1px solid rgba(255, 255, 255, 0.22)'
            />
            <InputRightElement>
                {isFetching ?
                    <Spinner color='secondary.50' opacity='1' size='sm' />
                    :
                    <Icon as={BsSearch} color='secondary.50' opacity='1' />
                }
            </InputRightElement>
        </InputGroup>

        {/* Show results */}
        {shouldDisplayResults && (
            <VStack
                position='absolute'
                top='3em'
                left='0'
                width='100%'
                zIndex='1'
            >
                <VStack
                    width='100%'
                    height='100%'
                    gap='0e'
                >

                    {movies.body.map((movie, i) => {

                        const isFirst = i === 0
                        const isLast = i === movies.body.length - 1

                        return (
                            <Link to='/movies/:id' params={{ id: String(movie.id) }} style={{ width: '100%' }}>
                                <HStack
                                    key={movie.id}
                                    position='relative'
                                    width='100%'
                                    height='5em'
                                    backgroundColor='rgba(0, 0, 0, 0.3)'
                                    borderTopRadius={isFirst ? '16px' : '0'}
                                    borderBottomRadius={isLast ? '16px' : '0'}
                                    boxShadow='0 4px 30px rgba(0, 0, 0, 0.1)'
                                    backdropFilter='blur(8px)'
                                    border='1px solid rgba(255, 255, 255, 0.22)'
                                    overflow='hidden'
                                    cursor='pointer'
                                >
                                    <Image
                                        src={movie.poster?.url}
                                        width='30%'
                                        position='absolute'
                                        top='-50%' left='-5%'
                                        borderLeftRadius='16px'
                                        sx={{
                                            maskImage: 'linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0) 100%)',
                                            maskRepeat: 'no-repeat',
                                            maskPosition: 'center',
                                        }}
                                    />
                                    <VStack ml='30%' alignItems='flex-start' gap='0'>
                                        <Text fontSize='.85em' fontWeight='bold'>{movie.title}</Text>
                                        <Text fontSize='0.65em'>{dayjs(movie.releaseDate).format('YYYY')}</Text>
                                    </VStack>
                                </HStack>
                            </Link>
                        )
                    })}
                </VStack>

            </VStack>

        )}
        <Box></Box>
    </Box>
}