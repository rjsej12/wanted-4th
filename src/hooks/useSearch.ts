import { DEFAULT_PAGE, DEFAULT_SEARCHEDLIST } from '../constants/search';
import { getSearchedList } from '../api/search';
import { useEffect, useState } from 'react';

const useSearch = (inputText: string) => {
	const [isSearching, setIsSearching] = useState(false);
	const [searchedList, setSearchedList] = useState<Search>(DEFAULT_SEARCHEDLIST);
	const [page, setPage] = useState(DEFAULT_PAGE);
	const [recommendList, setRecommendList] = useState<string[]>([]);

	const { page: apiPage, limit, q, qty, total } = searchedList;
	const isMoreData = limit * (apiPage - DEFAULT_PAGE) + qty < total;
	useEffect(() => {
		const fetchSearchedList = async () => {
			if (inputText === '') {
				setSearchedList(DEFAULT_SEARCHEDLIST);
				setRecommendList([]);
				setPage(DEFAULT_PAGE);
				return;
			}
			if (q !== inputText) {
				setSearchedList(DEFAULT_SEARCHEDLIST);
				setRecommendList([]);
				setPage(DEFAULT_PAGE);
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
