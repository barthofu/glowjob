import { contract } from '../contract'
import { generateOpenApi } from '@ts-rest/open-api'

export const openApiDocument = generateOpenApi(contract, {
	info: {
		title: 'Cinestia API',
		description: 'API for the Cinestia application.',
		version: '1.0',
	},
})
