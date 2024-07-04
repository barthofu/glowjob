import React, {useEffect, useState} from 'react'
import {OfferItem} from './OfferItem';
import {fetchRecommanded, Offer} from '@glowjob/openapi';
import {Flex, SimpleGrid, Spinner} from '@chakra-ui/react';
import {RecommendedCompany} from '../companies/RecommendedCompany';

type ListOffersProps = {}

export const ListOffers: React.FC<ListOffersProps> = () => {
  const [recommendedOffers, setRecommendedOffers] = useState<Offer[]>([]);

  useEffect(() => {
    fetchRecommanded({})
      .then(offers => setRecommendedOffers(offers));
  }, []);

  return <>
    {recommendedOffers?.length > 0 ?
      <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, 1fr)'>
        {recommendedOffers.map((offer, index: number) => (
          <OfferItem key={index} offer={offer}/>
        ))}
      </SimpleGrid> :
      <Flex
        justifyContent="center"
        alignItems="center">
        <Spinner emptyColor='#521262'
                 color='gray.200'
                 thickness='4px'
                 size='xl'/>
      </Flex>
    }
  </>
}
