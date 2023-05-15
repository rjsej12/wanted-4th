import { getSearchedList } from '../api/search';
import { useEffect, useState } from 'react';

const defaultSearchedList = {
	result: [],
	page: 1,
	limit: 10,
	q: '',
	qty: 0,
	total: 0,
};

const useSearch = (inputText: string) => {
	const [isSearching, setIsSearching] = useState(false);
	const [searchedList, setSearchedList] = useState<Search>(defaultSearchedList);
	const [page, setPage] = useState(1);
	const [recommendList, setRecommendList] = useState<string[]>([]);

	const { page: apiPage, limit, q, qty, total } = searchedList;
	const isMoreData = limit * (apiPage - 1) + qty < total;
	useEffect(() => {
		const fetchSearchedList = async () => {
			if (inputText === '') {
				setSearchedList(defaultSearchedList);
				setRecommendList([]);
				setPage(1);
				return;
			}
			if (q !== inputText) {
				setSearchedList(defaultSearchedList);
				setRecommendList([]);
				setPage(1);
			}
			try {
				setIsSearching(true);
				const data = await getSearchedList(inputText, page);
				if (data) {
					setSearchedList(data);
					if (q === inputText) setRecommendList((prev) => [...prev, ...data.result]);
				}
			} catch (error) {
				console.error(error);
				alert('Something went wrong.');
			} finally {
				setIsSearching(false);
			}
		};

		fetchSearchedList();
	}, [inputText, page, q]);

	return { isSearching, setPage, isMoreData, recommendList, setRecommendList };
};

export default useSearch;
