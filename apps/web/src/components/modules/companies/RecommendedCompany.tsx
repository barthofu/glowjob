import React from 'react'
import {Box, Card, CardBody, CardHeader, Heading, Stack, StackDivider, Text} from '@chakra-ui/react';
import {Company} from '@glowjob/openapi';

type RecommendedCompanyProps = {
  company: Company
}

export const RecommendedCompany: React.FC<RecommendedCompanyProps> = ({company}) => {

  return (
    <Card>
      <CardHeader>
        <Heading size='md'>
          {company.companyName} ({company.hiringPotential?.toFixed(2) ?? '?'}%)
        </Heading>
        {company.isHighPotential &&
          <Heading marginTop="1em" size='xs' textTransform='uppercase' color="#521262">
            Fort potentiel d'embauche ! 💪
          </Heading>
        }
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider/>} spacing='4'>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Information sur l'activité exercée 💼
            </Heading>
            <Text pt='2' fontSize='sm'>
              {company.nafLabel}
            </Text>
          </Box>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Localisation 📍
            </Heading>
            <Text pt='2' fontSize='sm'>
              <strong>Ville:</strong> {company.city}
              <br/>
              <strong>Département:</strong> {company.department}
              <br/>
              <strong>Région:</strong> {company.region}
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  )
}
