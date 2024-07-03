import { Flex, Heading } from '@chakra-ui/react'

const NotFoundPage: React.FC = () => {
	return (
		<Flex
			w='100%'
			h='100vh'
			position='absolute'
			top='0'
			left='0'
			justifyContent='center'
			alignItems='center'
		>
			<Heading
				as='h2'
				fontSize='4xl'
			>
				404 - not found
			</Heading>
		</Flex>
	)
}

export default NotFoundPage
