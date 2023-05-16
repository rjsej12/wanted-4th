import { DEFAULT_LIMIT } from '../constants/search';
import { SEARCH_RESOURCE } from '../constants/config';
import apiRequest from './index';

export const getSearchedList = async (keyword: string, page: number): Promise<Search> => {
	try {
		const response = await apiRequest.get(`${SEARCH_RESOURCE}?q=${keyword}&page=${page}&limit=${DEFAULT_LIMIT}`);

		return response.data;
	} catch (error) {
		throw new Error('API getSearchedList error');
	}
};
