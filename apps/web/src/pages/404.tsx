import { DefaultLayout } from '../components/layouts'
import { NotFound } from '../components/shared'

const NotFoundPage: React.FC = () => {
	return <DefaultLayout
		title='Not found'
	>
		<NotFound />
	</DefaultLayout>
}

export default NotFoundPage
