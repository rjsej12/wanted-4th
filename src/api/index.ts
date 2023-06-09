import { BASE_URL, TOKEN } from '../constants/config';
import axios from 'axios';
import { AxiosRequestConfig } from 'axios';
import { AxiosResponse } from 'axios';

const baseInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		Authorization: `Bearer ${TOKEN}`,
	},
});

baseInstance.interceptors.response.use(({ data }) => data);

const apiRequest = {
	get: <T = never, R = AxiosResponse<T>>(url: string, request?: AxiosRequestConfig<T>): Promise<R> =>
		baseInstance.get(url, request),
	delete: <T = never, R = AxiosResponse<T>>(url: string, request?: AxiosRequestConfig<T>): Promise<R> =>
		baseInstance.delete(url, request),
	post: <T = never, R = AxiosResponse<T>>(url: string, data?: T, config?: AxiosRequestConfig<T>): Promise<R> =>
		baseInstance.post(url, data, config),
};

export default apiRequest;
