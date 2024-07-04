import React, {useEffect, useMemo, useState} from 'react'
import {Flex, Heading, Input, SimpleGrid, Spinner} from '@chakra-ui/react';
import debounce from 'debounce';
import {fetchSearch, Offer} from '@glowjob/openapi';
import {OfferItem} from '../offers/OfferItem';

type SearchBarProps = {}

export const SearchBar: React.FC<SearchBarProps> = () => {
  const [query, setQuery] = useState<string>('');
  const [offers, setOffers] = useState<Offer[] | undefined>(undefined);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);

    if (!e.target.value) {
      setOffers(undefined);
    }

    fetchSearch({
      queryParams: {
        query: e.target.value
      }
    }).then(response => setOffers(response?.resultats?.slice(0, 25) ?? []))
  }

  const debouncedResults = useMemo(() => {
    return debounce(handleInputChange, 300);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.clear();
    };
  });

  return <>
    <Input
      variant="outline"
      placeholder="Recherche une offre"
      borderRadius="23px"
      backgroundColor="white"
      width="30%"
      margin="0 20px"
      borderColor="gray.400"
      focusBorderColor="gray.700"
      onChange={debouncedResults}
    />

    {query &&
      <Flex position="absolute"
            justifyContent="center"
            width="95vw"
            height="88vh"
            top="10vh"
            backgroundColor="white"
            borderRadius="1.5em">
        {offers === undefined && <Spinner emptyColor='#521262'
                                          color='gray.200'
                                          thickness='4px'
                                          size='xl' alignSelf="center"/>}

        {offers?.length ?
          <SimpleGrid spacing={4}
                      templateColumns='1fr'
                      gridAutoRows="min-content"
                      width="100%"
                      height="100%"
                      paddingX="3em"
                      paddingY="2em"
                      overflowY="scroll">
            {offers.map((offer, index: number) => (
              <OfferItem key={index} offer={offer}/>
            ))}
          </SimpleGrid>
          :
          <>
            {offers && <Heading size="md"
                                alignSelf="center"
                                color="gray.500">Pas de résultats...</Heading>}
          </>
        }
      </Flex>
    }

  </>;
}
