import { ImSpinner8 } from 'react-icons/im';
import DropdownItem from './DropdownItem';
import useIntersectionObserver from '../hooks/useIntersectonObserver';

type DropdownProps = {
	recommendList: string[];
	isSearching: boolean;
	setPage: React.Dispatch<React.SetStateAction<number>>;
	handleClick: (value: string) => () => Promise<void>;
	isMoreData: boolean;
	keyword: string;
};

const Dropdown = ({ recommendList, isSearching, setPage, handleClick, isMoreData, keyword }: DropdownProps) => {
	const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
		if (isSearching) return;
		if (isIntersecting) setPage((prev) => prev + 1);
	};
	const { setTarget } = useIntersectionObserver({ onIntersect });

	return recommendList.length ? (
		<ul className="dropdown">
			{recommendList.map((searchWord, index) => (
				<DropdownItem key={index} searchWord={searchWord} keyword={keyword} handleClick={handleClick} />
			))}
			{isSearching ? <ImSpinner8 className="spinner align-center" /> : <></>}
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
