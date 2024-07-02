import { initQueryClient } from '@ts-rest/react-query'
import { contract } from '@cinestia/contract'
import axios, { Method, AxiosError, AxiosResponse, isAxiosError, AxiosRequestConfig } from 'axios'
import { ClientArgs, initClient } from '@ts-rest/core'
import { AuthService } from '@cinestia/web/auth'
import { environment } from '@cinestia/environments'

const clientArgs: ClientArgs = {
	baseUrl: environment.apiBaseUrl,
	baseHeaders: {
		'Content-Type': 'application/json',
	},
	// @ts-ignore
	api: async ({ path, method, headers, body }) => {
		// Get token from local storage
		const token = AuthService.getToken()

		const config: AxiosRequestConfig = {
			method: method.toUpperCase() as Method,
			url: path,
			data: body,
			headers: {
				...headers,
				authorization: `Bearer ${token}`,
			},
		}

		try {
			const response = await axios.request(config)

			if (response.status === 401 || response.status === 403) AuthService.logout()

			return {
				status: response.status,
				body: response.data,
				headers: response.headers,
			}
		} catch (e: Error | AxiosError | any) {
			if (isAxiosError(e)) {
				const error = e as AxiosError
				const response = error.response as AxiosResponse
				return {
					status: response.status,
					body: response.data,
					headers: response.headers,
				}
			}
			throw e
		}
	},
}

export const client = initClient(contract, clientArgs)
export const queryClient = initQueryClient(contract, clientArgs)