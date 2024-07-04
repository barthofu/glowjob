import {Box, Button, Flex, FormControl, FormLabel, Icon, Image, Input, Select, Stack, Text} from '@chakra-ui/react';
import {
  AreaReference,
  ContractTypeReference,
  DepartmentReference,
  fetchAreaReference,
  fetchContractTypeReference,
  fetchDepartmentReference,
  fetchSearch1
} from '@glowjob/openapi';
import {Link} from '@glowjob/web/router';
import {AsyncSelect} from 'chakra-react-select';
import React, {useEffect, useState} from 'react';
import {FaClipboardList, FaSignOutAlt, FaUser} from 'react-icons/fa';

const loadJobs = async (inputValue: string) => {
  return fetchSearch1({
    queryParams: {
      query: 'boucher'
    }
  }).then(response =>
    (response.flatMap(
      (job) => job.metiersRome).map(
      (job) => ({value: job?.codeRome!, label: job?.libelleAppellation!}))))
}

const ProfilePage: React.FC = () => {
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<AreaReference>({});
  const [selectedDepartment, setSelectedDepartment] = useState<DepartmentReference>({});
  const [selectedContractType, setSelectedContractType] = useState<ContractTypeReference>({});

  const [contractTypeReference, setContractTypeReference] = useState<ContractTypeReference[]>([]);
  const [areaReference, setAreaReference] = useState<AreaReference[]>([]);
  const [departmentReference, setDepartmentReference] = useState<DepartmentReference[]>([]);

  const handleJobChange = (jobs: string[]) => {
    setSelectedJobs(jobs);
  };

  const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(event.target.value);
  };

  const handleDepartmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDepartment(event.target.value);
  };

  const handleContractTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedContractType(event.target.value);
  };

  useEffect(() => {
    Promise.all([
      fetchContractTypeReference({}),
      fetchAreaReference({}),
      fetchDepartmentReference({})
    ]).then(([contratType, areas, departements]) => {
      setContractTypeReference(contratType);
      setAreaReference(areas);
      setDepartmentReference(departements);
    });
  }, []);

  return (
    <Flex direction="column" height="100vh">
      <Flex flex="1">
        <Box
          width="30%"
          height="100%"
          backgroundColor="#2E0A37"
          padding="2rem"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Stack spacing={10} width="100%">
            <Link to="/users/profile">
              <Box display="flex" alignItems="center" color="white" fontSize="2xl">
                <Icon as={FaUser} marginRight="1rem" color="#9A22B8" boxSize={8}/>
                <Text color="#9A22B8" as="span">
                  Mes Informations
                </Text>
              </Box>
            </Link>
            <Link to="/users/favoffers">
              <Box display="flex" alignItems="center" color="white" fontSize="2xl">
                <Icon as={FaClipboardList} marginRight="1rem" boxSize={8}/>
                <Text>Mes Offres Suivis</Text>
              </Box>
            </Link>
          </Stack>
          <Box width="100%" marginTop="auto">
            <Link to="/auth/login">
              <Box display="flex" alignItems="center" color="white" fontSize="2xl">
                <Icon as={FaSignOutAlt} marginRight="1rem" boxSize={8}/>
                <Text>Déconnexion</Text>
              </Box>
            </Link>
          </Box>
        </Box>
        <Box
          flex="1"
          backgroundColor="#521262"
          padding="2rem"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Box width="50%" display="flex" justifyContent="center" alignItems="center" mb="1rem">
            <Image
              src='/logoGlowjob.png'
              alt='Logo Glowjob'
              objectFit='contain'
              width='75%'
            />
          </Box>
          <Flex width="100%" flex="1" justifyContent="center" alignItems="center">
            <Box width="75%">
              <Stack spacing={4}>
                <Flex width="100%" justifyContent="space-between">
                  <FormControl flex="1" marginRight="1rem">
                    <FormLabel color="white">Nom</FormLabel>
                    <Input placeholder="Nom" color="white" _placeholder={{color: 'white'}}/>
                  </FormControl>
                  <FormControl flex="1" marginLeft="1rem">
                    <FormLabel color="white">Prénom</FormLabel>
                    <Input placeholder="Prénom" color="white" _placeholder={{color: 'white'}}/>
                  </FormControl>
                </Flex>
                <Flex width="100%" justifyContent="space-between">
                  <FormControl flex="1" marginRight="1rem">
                    <FormLabel color="white">Mail</FormLabel>
                    <Input placeholder="Mail" color="white" _placeholder={{color: 'white'}}/>
                  </FormControl>
                  <FormControl flex="1" marginLeft="1rem">
                    <FormLabel color="white">Mot de Passe</FormLabel>
                    <Input type="password" placeholder="Mot de Passe" color="white" _placeholder={{color: 'white'}}/>
                  </FormControl>
                </Flex>
                <Flex width="100%" justifyContent="space-between">
                  <FormControl flex="1" marginRight="2rem">
                    <FormLabel color="white">Localisation régionale</FormLabel>
                    <Select
                      placeholder="Sélectionnez une région"
                      color="white"
                      onChange={handleRegionChange}
                      sx={{
                        '> option': {
                          background: '#521262',
                          color: 'white',
                        },
                      }}
                    >
                      {areaReference?.map((type, index) => (
                        <option key={index} value={type}>{type.libelle}</option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl flex="1">
                    <FormLabel color="white">Localisation départementale</FormLabel>
                    <Select
                      placeholder="Sélectionnez un département"
                      color="white"
                      onChange={handleDepartmentChange}
                      sx={{
                        '> option': {
                          background: '#521262',
                          color: 'white',
                        },
                      }}
                    >
                      {departmentReference?.map((type, index) => (
                        <option key={index} value={type}>{type.libelle}</option>
                      ))}
                    </Select>
                  </FormControl>
                </Flex>
                <Flex width="100%" justifyContent="space-between">
                  <FormControl flex="1" marginRight="2rem">
                    <FormLabel color="white">Type de Contrat</FormLabel>
                    <Select
                      placeholder="Sélectionnez un type de contrat"
                      color="white"
                      onChange={handleContractTypeChange}
                      sx={{
                        '> option': {
                          background: '#521262',
                          color: 'white',
                        },
                      }}
                    >
                      {contractTypeReference?.map((type, index) => (
                        <option key={index} value={type}>{type.libelle}</option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl flex="1">
                    <FormLabel color="white">Métier</FormLabel>
                    <Box
                      maxHeight="70px"
                      overflowY="auto"
                      border="1px solid #ccc"
                      borderRadius="md"
                      padding="2"
                      color="white"
                    >
                      <AsyncSelect
                        loadOptions={loadJobs}
                      />
                    </Box>
                  </FormControl>
                </Flex>

                <Box display="flex" justifyContent="center" mt="2rem">
                  <Button
                    w='75%'
                    variant='solid'
                    type='submit'
                    backgroundColor="#2E0A37"
                    color="white"
                  >
                    Mettre à jour
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}

export default ProfilePage;
