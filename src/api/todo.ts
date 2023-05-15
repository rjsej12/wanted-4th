import apiRequest from './index';

const RESOURCE = '/todos';

export const getTodoList = async (): Promise<Todo[]> => {
	try {
		const response = await apiRequest.get(`${RESOURCE}`);

		return response.data;
	} catch (error) {
		throw new Error('API getTodoList error');
	}
};

export const createTodo = async (data: any): Promise<Todo> => {
	try {
		const response = await apiRequest.post(`${RESOURCE}`, data);

		return response.data;
	} catch (error) {
		throw new Error('API createTodo error');
	}
};

export const deleteTodo = async (id: string): Promise<Todo> => {
	try {
		const response = await apiRequest.delete(`${RESOURCE}/${id}`);

		return response.data;
	} catch (error) {
		throw new Error('API deleteTodo error');
	}
};
