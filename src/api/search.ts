import apiRequest from './index';

const RESOURCE = '/search';

export const getSearchedList = async (keyword: string, page: number): Promise<Search> => {
	try {
		const response = await apiRequest.get(`${RESOURCE}?q=${keyword}&page=${page}&limit=10`);

		return response.data;
	} catch (error) {
		throw new Error('API getSearchedList error');
	}
};
