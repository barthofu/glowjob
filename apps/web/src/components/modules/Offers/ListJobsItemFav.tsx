import { Flex, Image, Link, Text, Button } from '@chakra-ui/react';
import React from 'react';

type ListJobsItemProps = {
  job: {
    Titre: string;
    Type: string;
    DateDebut: string;
    DateFin: string;
    Entreprise: string;
    Lieu: string;
    Niveau: string;
    Contact: string;
  };
};

export const ListJobsItemFav: React.FC<ListJobsItemProps> = ({ job }) => {
  return (
    <Flex
      border="2px solid #9a22b8"
      borderRadius="2vh"
      padding="1%"
      margin="1%"
      color="white"
      justifyContent="space-around"
    >
      <Image src="https://picsum.photos/100/100.webp" alt="logo entreprise" />
      <Flex direction="column" width="80%">
        <Text as="u">{job.Titre}</Text>
        <Flex justifyContent="space-between" align="center">
          <Flex width="70%" justifyContent="flex-start" gap="3%">
            <Flex direction="column">
              <Text>Type: {job.Type}</Text>
              <Text>Date de début: {job.DateDebut}</Text>
              <Text>Date de fin: {job.DateFin}</Text>
            </Flex>
            <Flex direction="column">
              <Text>Entreprise: {job.Entreprise}</Text>
              <Text>Lieu: {job.Lieu}</Text>
              <Text>Niveau: {job.Niveau}</Text>
            </Flex>
          </Flex>
          <Flex direction="column" alignItems="center">
            <Button
              backgroundColor="#9a22b8"
              color="white"
              border="2px solid white"
              borderRadius="23px"
              padding="5px"
              marginBottom="10px"
            >
              Supprimer des favoris
            </Button>
            <Link
              backgroundColor="#9a22b8"
              color="white"
              border="2px solid white"
              borderRadius="23px"
              padding="5px"
              href={`mailto:${job.Contact}`}
            >
              Consulter
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
