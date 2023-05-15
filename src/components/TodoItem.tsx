import { FaTrash } from 'react-icons/fa';
import { ImSpinner8 } from 'react-icons/im';
import { useCallback, useEffect, useState } from 'react';

import { deleteTodo } from '../api/todo';

type TodoItemProps = {
	id: string;
	title: string;
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const TodoItem = ({ id, title, setTodos }: TodoItemProps) => {
	const [isLoading, setIsLoading] = useState(false);

	const handleRemoveTodo = useCallback(async () => {
		try {
			setIsLoading(true);
			await deleteTodo(id);

			setTodos((prev) => prev.filter((item) => item.id !== id));
		} catch (error) {
			console.error(error);
			alert('Something went wrong.');
		}
	}, [id, setTodos]);

	useEffect(() => {
		return () => setIsLoading(false);
	}, []);

	return (
		<li className="item">
			<span>{title}</span>
			<div className="item-option">
				{!isLoading ? (
					<button onClick={() => handleRemoveTodo()}>
						<FaTrash className="btn-trash" />
					</button>
				) : (
					<ImSpinner8 className="spinner" />
				)}
			</div>
		</li>
	);
};

export default TodoItem;
