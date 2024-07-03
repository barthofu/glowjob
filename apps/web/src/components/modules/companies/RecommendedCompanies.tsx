import React from 'react'
import {useGetRecommendedCompanies} from '@glowjob/openapi';
import {RecommendedCompany} from './RecommendedCompany';

type RecommendedCompaniesProps = {}

export const RecommendedCompanies: React.FC<RecommendedCompaniesProps> = () => {

  const companies = useGetRecommendedCompanies({});

  return (
    <div>
      {companies.isLoading && <p>Chargement des entreprises à forts potentiels d'embauche...</p>}

      {companies.data?.map((company, index) => (
        <RecommendedCompany company={company}/>
      ))}
    </div>
  )
}
