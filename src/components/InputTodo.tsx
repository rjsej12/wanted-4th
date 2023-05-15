import { FaPlusCircle, FaSpinner } from 'react-icons/fa';
import { useCallback, useEffect, useState } from 'react';

import { createTodo } from '../api/todo';
import { getSearchedList } from '../api/search';
import useFocus from '../hooks/useFocus';
import useDebounce from '../hooks/useDebounce';
import Dropdown from './Dropdown';

type InputTodoProps = {
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const InputTodo = ({ setTodos }: InputTodoProps) => {
	const [inputText, setInputText] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [searchedList, setSearchedList] = useState<Search>();
	const { ref, setFocus } = useFocus();
	const debouncedInputText = useDebounce(inputText);

	useEffect(() => {
		setFocus();
	}, [setFocus]);

	const handleSubmit = useCallback(
		async (e: React.FormEvent<HTMLFormElement>) => {
			try {
				e.preventDefault();
				setIsLoading(true);

				const trimmed = inputText.trim();
				if (!trimmed) {
					return alert('Please write something');
				}

				const newItem = { title: trimmed };
				const { data } = await createTodo(newItem);

				if (data) {
					return setTodos((prev) => [...prev, data]);
				}
			} catch (error) {
				console.error(error);
				alert('Something went wrong.');
			} finally {
				setInputText('');
				setIsLoading(false);
			}
		},
		[inputText, setTodos]
	);

	useEffect(() => {
		const fetchSearchedList = async () => {
			if (debouncedInputText === '') {
				setSearchedList(undefined);
				return;
			}
			try {
				setIsLoading(true);

				const { data } = await getSearchedList(debouncedInputText);
				if (data) {
					setSearchedList(data);
				}
			} catch (error) {
				console.error(error);
				alert('Something went wrong.');
			} finally {
				setIsLoading(false);
			}
		};
		fetchSearchedList();
	}, [debouncedInputText]);

	return (
		<form className="form-container" onSubmit={handleSubmit}>
			<input
				className="input-text"
				placeholder="Add new todo..."
				ref={ref}
				value={inputText}
				onChange={(e) => setInputText(e.target.value)}
				disabled={isLoading}
			/>
			<Dropdown searchedList={searchedList} isLoading={isLoading} />
			{!isLoading ? (
				<button className="input-submit" type="submit">
					<FaPlusCircle className="btn-plus" />
				</button>
			) : (
				<FaSpinner className="spinner" />
			)}
		</form>
	);
};

export default InputTodo;
