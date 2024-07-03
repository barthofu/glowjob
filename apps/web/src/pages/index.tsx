import { Box } from '@chakra-ui/react'
import { DefaultLayout } from '../components/layouts'

const HomePage = () => {
	return (
		<DefaultLayout
			title='Glowjob'
			fadedImage='https://picsum.photos/100/100.webp'
			queryStatus={200}
		>
			<Box minHeight='100vh'></Box>
		</DefaultLayout>
	)
}

export default HomePage
