import { AuthService } from '@glowjob/web/auth'
import { environment } from '@glowjob/web/environments'
import defaultAxios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { toast } from 'react-toastify'
import { ErrorWrapper } from '../generated/apiFetcher'

export const axiosInstance = defaultAxios.create({
	baseURL: environment.apiBaseUrl, // Replace with your base URL
	timeout: 30000, // Set a reasonable timeout
	headers: {
		'Content-Type': 'application/json',
	},
})

// Request interceptor to handle multipart/form-data and set headers
axiosInstance.interceptors.request.use((config) => {

    const contentType = config.headers['Content-Type']

	if (contentType?.toString()?.toLowerCase().includes('multipart/form-data')) {
		delete config.headers['Content-Type']
	}
	return config
})

// Response interceptor to handle errors and response parsing
axiosInstance.interceptors.response.use(
	(response: AxiosResponse) => {
		if (response.headers['content-type']?.includes('json')) {
			return response.data
		}
    else if (response.headers['content-type']?.includes('pdf')) {
      return {
        data: response.data,
        headers: response.headers
      }
    }
    else {
			// If it's not a JSON response, assume it's a blob and cast it
			return response.data as unknown
		}
	},
	async (error: AxiosError) => {

		if (error.response) {

			const originalConfig = error.config as (InternalAxiosRequestConfig<any> & { _retry: boolean }) | undefined
			if (!originalConfig) return Promise.reject(error)

			// Handle response errors
			const errorWrapper: ErrorWrapper<any> = {
				status: error.response.status, // Set your status based on error.response
				payload: error.response.data,
			}

			if (error.response.status === 400) {
				for (const [key, value] of Object.entries(errorWrapper.payload)) {
					toast.error(`${key}: ${(value as Array<any>).join(', ')}`, { toastId: key })
				}
			}

			return Promise.reject(errorWrapper)
		} else if (error.request) {

			// Handle request errors
			const errorWrapper: Error = {
				name: 'unknown',
				message: `Network error (${error.message})`,
				stack: error.stack || '',
			}
			if (!['canceled'].includes(error.message)) toast.error(errorWrapper.message, { toastId: 'network-error' })

			return Promise.reject(errorWrapper)

		} else {
			// Handle other errors
			const errorObject: Error = {
				name: 'unknown',
				message: `Unknown error (${error.message})`,
				stack: error.stack || '',
			}
			return Promise.reject(errorObject)
		}
	}
)

// export const axios = defaultAxios.create({
//     baseURL: environment.apiBaseUrl
// })

// axios.interceptors.response.use((response) => {

//     // logout if unauthorized
//     if (response.status === 401) {
//         AuthService.logout()
//     }

//     return response
// })
