import { config } from '../config'
import axios, { AxiosResponse } from 'axios'
import { SignUpRequestBody } from '../interfaces'

export const registerUser = async (userData: SignUpRequestBody): Promise<AxiosResponse> => {
	try {
		console.log(config.API_ROUTES.REGISTER)
		const response: AxiosResponse = await axios.post(config.API_ROUTES.REGISTER, userData, {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			}
		})

		return response
	} catch (error) {
		if (axios.isAxiosError(error)) {
			// Axios error (e.g., network error, response status not in 2xx)
			console.error('(Axios) Registration failed:', error.message)
			if (error.response) {
				// The request was made and the server responded with a status code
				console.error('Response data:', error.response.data)
				console.error('Response status:', error.response.status)
				console.error('Response headers:', error.response.headers)
			}
		} else {
			// Non-Axios error
			console.error('An unexpected error occurred:', error)
		}

		throw error
	}
}
