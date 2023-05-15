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
	const [isSearching, setIsSearching] = useState(false);
	const [searchedList, setSearchedList] = useState<Search>();
	const [page, setPage] = useState(1);
	const { ref, setFocus } = useFocus();
	const debouncedInputText = useDebounce(inputText);

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

	const handleClick = (value: string) => async () => {
		try {
			setIsLoading(true);

			const newItem = { title: value };
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
	};

	useEffect(() => {
		setFocus();
	}, [setFocus]);

	useEffect(() => {
		const fetchSearchedList = async () => {
			if (debouncedInputText === '') {
				setSearchedList(undefined);
				setPage(1);
				return;
			}
			try {
				setIsSearching(true);

				const { data } = await getSearchedList(debouncedInputText, page);
				if (data) {
					setSearchedList(data);
				}
			} catch (error) {
				console.error(error);
				alert('Something went wrong.');
			} finally {
				setIsSearching(false);
			}
		};
		fetchSearchedList();
	}, [debouncedInputText, page]);

	return (
		<form className="form-container" onSubmit={handleSubmit}>
			<input
				className="input-text"
				placeholder="Add new todo..."
				ref={ref}
				value={inputText}
				onChange={(e) => {
					setInputText(e.target.value);
					if (e.target.value === '') {
						setSearchedList(undefined);
						setPage(1);
					}
				}}
				disabled={isLoading}
			/>
			{searchedList ? (
				<Dropdown
					searchedList={searchedList}
					isSearching={isSearching}
					setPage={setPage}
					handleClick={handleClick}
				/>
			) : (
				<></>
			)}
			{!isLoading && !isSearching ? (
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
