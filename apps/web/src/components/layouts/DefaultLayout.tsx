import { Box, Flex } from '@chakra-ui/react'
import { Helmet } from 'react-helmet'
import React from 'react'
import Header from '../modules/navigation/Header'
import NotFoundPage from '../../pages/404'
import InternalErrorPage from '../../pages/500'

type DefaultLayoutProps = {
	children: React.ReactNode
	title?: string
	queryStatus?: number
	fadedImage?: string
}

export const DefaultLayout: React.FC<DefaultLayoutProps> = (props) => {
	return (
		<Box
			backgroundColor='#13161d'
			minHeight='100vh'
		>
			<Helmet>
				<title>{props.title || 'Cinéstia'}</title>
			</Helmet>

			<Header />
			<Flex
				position='absolute'
				w='100%'
				h='100%'
				zIndex={1}
				justifyContent='center'
			>
				<Box maxWidth='70vw'>
					{props.queryStatus === 404 ? (
						<NotFoundPage />
					) : props.queryStatus === 500 ? (
						<InternalErrorPage />
					) : (
						props.children
					)}
					<Box height='5em' />
				</Box>
			</Flex>
		</Box>
	)
}
