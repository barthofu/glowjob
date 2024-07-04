import React, {useEffect, useState} from 'react'
import {Company, fetchGetRecommendedCompanies} from '@glowjob/openapi';
import {RecommendedCompany} from './RecommendedCompany';
import {Flex, SimpleGrid, Spinner} from '@chakra-ui/react';

type RecommendedCompaniesProps = {}

export const RecommendedCompanies: React.FC<RecommendedCompaniesProps> = () => {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    fetchGetRecommendedCompanies({})
      .then((value) => setCompanies(value));
  }, []);

  return (
    <>
      {companies?.length > 0 ?
        <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(230px, 1fr))'>
          {companies?.map((company, index) => (
            <RecommendedCompany key={index} company={company}/>
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
  )
}
