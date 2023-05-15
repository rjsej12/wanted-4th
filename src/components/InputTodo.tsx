import { FaPlusCircle, FaSearch } from 'react-icons/fa';
import { ImSpinner8 } from 'react-icons/im';

import { useCallback, useEffect, useState } from 'react';

import { createTodo } from '../api/todo';
import useFocus from '../hooks/useFocus';
import useDebounce from '../hooks/useDebounce';
import useSearch from '../hooks/useSearch';
import Dropdown from './Dropdown';

type InputTodoProps = {
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const InputTodo = ({ setTodos }: InputTodoProps) => {
	const [inputText, setInputText] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const { ref, setFocus } = useFocus();
	const debouncedInputText = useDebounce(inputText);
	const { isSearching, recommendList, setPage, isMoreData } = useSearch(debouncedInputText);

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
				const data = await createTodo(newItem);

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

			setInputText(value);
			const newItem = { title: value };
			const data = await createTodo(newItem);

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

	return (
		<div className="form-wrapper">
			{recommendList ? (
				<Dropdown
					recommendList={recommendList}
					isSearching={isSearching}
					setPage={setPage}
					isMoreData={isMoreData}
					handleClick={handleClick}
					keyword={debouncedInputText}
				/>
			) : (
				<></>
			)}
			<form className={isSearching ? 'form-container accent-border' : 'form-container'} onSubmit={handleSubmit}>
				<div className="search-bar">
					<FaSearch />
					<input
						className="input-text"
						placeholder="Add new todo..."
						ref={ref}
						value={inputText}
						onChange={(e) => {
							setInputText(e.target.value);
						}}
						disabled={isLoading}
					/>
				</div>
				{!isLoading && !isSearching ? (
					<button className="input-submit" type="submit">
						<FaPlusCircle className="btn-plus" />
					</button>
				) : (
					<ImSpinner8 className="spinner" />
				)}
			</form>
		</div>
	);
};

export default InputTodo;
