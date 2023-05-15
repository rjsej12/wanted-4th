import { FaSpinner } from 'react-icons/fa';
import DropdownItem from './DropdownItem';
import useIntersectionObserver from '../hooks/useIntersectonObserver';
import { useEffect, useState } from 'react';

type DropdownProps = {
	searchedList: Search;
	isSearching: boolean;
	setPage: React.Dispatch<React.SetStateAction<number>>;
};

const Dropdown = ({ searchedList, isSearching, setPage }: DropdownProps) => {
	const [results, setResults] = useState<string[]>([]);
	const { result, page, limit, q: keyword, qty, total } = searchedList;
	const isMoreData = limit * (page - 1) + qty < total;
	const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
		if (isSearching) return;
		if (isIntersecting) setPage((prev) => prev + 1);
	};
	const { setTarget } = useIntersectionObserver({ onIntersect });

	useEffect(() => {
		setResults((prev) => [...prev, ...result]);
	}, [result]);

	return results.length ? (
		<ul className="dropdown">
			{results.map((searchWord, index) => (
				<DropdownItem key={index} searchWord={searchWord} keyword={keyword} />
			))}
			{isSearching ? <FaSpinner className="spinner align-center" /> : <></>}
			{!isSearching && isMoreData ? (
				<span className="align-center" ref={setTarget}>
					...
				</span>
			) : (
				<></>
			)}
		</ul>
	) : (
		<></>
	);
};

export default Dropdown;
