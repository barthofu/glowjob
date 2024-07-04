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
			minHeight='100vh'
			backgroundColor="#2e0a37"
		>
			<Helmet>
				<title>{props.title || 'GlowJob'}</title>
			</Helmet>

			<Header />
			<Flex
				marginTop="10vh"
				position='absolute'
				justifyContent='center'
				w='100%'
				zIndex={1}
			>
				<Box width='70vw'>
					{props.queryStatus === 404 ? (
						<NotFoundPage />
					) : props.queryStatus === 500 ? (
						<InternalErrorPage />
					) : (
						props.children
					)}
				</Box>
			</Flex>
		</Box>
	)
}
