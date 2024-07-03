import React, {useEffect, useState} from 'react'
import {fetchGetRecommendedCompanies} from '@glowjob/openapi';
import {RecommendedCompany} from './RecommendedCompany';

type RecommendedCompaniesProps = {}

export const RecommendedCompanies: React.FC<RecommendedCompaniesProps> = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetchGetRecommendedCompanies({})
      .then((value) => setCompanies(value));
  }, []);

  return (
    <div>
      {companies?.map((company, index) => (
        <RecommendedCompany key={index} company={company}/>
      ))}
    </div>
  )
}
