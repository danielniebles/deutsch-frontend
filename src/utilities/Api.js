import axios from 'axios'

export function Api() {
	const apiCreate = axios.create({
		//config.api.baseURL
		baseURL: 'http://localhost:3000'
	})
	return apiCreate
}
