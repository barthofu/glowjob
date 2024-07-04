import {Button, Card, CardBody, CardFooter, Flex, Heading, Image, Link, Stack, Text} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import {Contact, fetchRecommanded, Offer, Salaire} from '@glowjob/openapi';

type OfferItemProps = {
  offer: Offer;
};

const formatSalaire = (salaire: Salaire | undefined) => {
  return [salaire?.libelle, salaire?.commentaire, salaire?.complement1, salaire?.complement2]
    .filter(s => !!s)
    .join(", ");
};

const formatContact = (contact: Contact | undefined) => {
  return [contact?.nom, contact?.coordonnees1, contact?.coordonnees2, contact?.coordonnees3, contact?.courriel, contact?.telephone]
    .filter(s => !!s)
    .join(", ");
}

export const OfferItem: React.FC<OfferItemProps> = ({offer}) => {
  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='outline'
    >
      <Image
        objectFit='cover'
        maxW={{ base: '100%', sm: '200px' }}
        src={offer.entreprise?.logo ?? "https://via.placeholder.com/200"}
        alt={offer.entreprise?.nom}
      />

      <Stack>
        <CardBody>
          <Heading size='md'>{offer.intitule}</Heading>

          <Flex direction="column" py={2}>
            <Text noOfLines={4}>{offer.description}</Text>
            <Text><strong>Type:</strong> {offer.typeContrat}</Text>
            <Text><strong>Salaire:</strong> {formatSalaire(offer.salaire)}</Text>
            {offer.experienceLibelle && <Text><strong>Expérience requise:</strong> {offer.experienceLibelle}</Text>}
            <Text><strong>Volume horaire:</strong> {offer.dureeTravailLibelle} - {offer.dureeTravailLibelleConverti}</Text>
            {offer.contact && <Text><strong>Contact:</strong> {formatContact(offer.contact)}</Text>}
          </Flex>
        </CardBody>

        {offer.origineOffre?.urlOrigine &&
          <CardFooter>
            <Link href={offer.origineOffre.urlOrigine} isExternal={true}>
              <Button variant='solid'
                      colorScheme='purple'>
                Voir l'offre d'origine
              </Button>
            </Link>
          </CardFooter>
        }
      </Stack>
    </Card>
   /* <Flex
      border="2px solid #9a22b8"
      borderRadius="2vh"
      padding="1%"
      margin="1%"
      color="white"
      justifyContent="space-around"
    >
      <Image
        src="https://picsum.photos/100/100.webp"
        alt="logo entreprise"
      />
      <Flex
        direction="column"
        width="80%"
      >
        <Text as='u'>{offer.Titre}</Text>
        <Flex
          justifyContent="space-between"
          align="center"
        >
          <Flex
            width="70%"
            justifyContent="flex-start"
            gap="3%"
          >
            <Flex
              direction="column"
            >
              <Text>Type: {offer.Type}</Text>
              <Text>Date de début: {offer.DateDebut}</Text>
              <Text>Date de fin: {offer.DateFin}</Text>
            </Flex>
            <Flex
              direction="column"
            >
              <Text>Entreprise: {offer.Entreprise}</Text>
              <Text>Lieu: {offer.Lieu}</Text>
              <Text>Niveau: {offer.Niveau}</Text>
            </Flex>
          </Flex>
          <Link
            backgroundColor="#9a22b8"
            color="white"
            border="2px solid white"
            borderRadius="23px"
            padding="5px"
            href={`mailto:${offer.Contact}`}
          >
            Consulter
          </Link>
        </Flex>
      </Flex>
    </Flex>*/
  );
};
