import { TODO_RESOURCE } from '../constants/config';
import apiRequest from './index';

export const getTodoList = async (): Promise<Todo[]> => {
	try {
		const response = await apiRequest.get(`${TODO_RESOURCE}`);

		return response.data;
	} catch (error) {
		throw new Error('API getTodoList error');
	}
};

export const createTodo = async (data: any): Promise<Todo> => {
	try {
		const response = await apiRequest.post(`${TODO_RESOURCE}`, data);

		return response.data;
	} catch (error) {
		throw new Error('API createTodo error');
	}
};

export const deleteTodo = async (id: string): Promise<Todo> => {
	try {
		const response = await apiRequest.delete(`${TODO_RESOURCE}/${id}`);

		return response.data;
	} catch (error) {
		throw new Error('API deleteTodo error');
	}
};
