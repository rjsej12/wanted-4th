import apiRequest from './index';

const RESOURCE = '/search';

export const getSearchedList = async (keyword: string, page: number = 1) => {
	try {
		const response = await apiRequest.get(`${RESOURCE}?q=${keyword}&page=${page}&limit=10`);

		return response;
	} catch (error) {
		throw new Error('API getSearchedList error');
	}
};
