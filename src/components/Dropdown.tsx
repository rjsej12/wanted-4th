import { FaSpinner } from 'react-icons/fa';
import DropdownItem from './DropdownItem';

type DropdownProps = {
	searchedList: Search | undefined;
	isLoading: boolean;
};

const Dropdown = ({ searchedList, isLoading }: DropdownProps) => {
	if (!searchedList) return <></>;
	console.log(searchedList);
	const { result, q: keyword, qty, total } = searchedList;
	return result.length ? (
		<ul className="dropdown">
			{result.map((searchWord, index) => (
				<DropdownItem key={index} searchWord={searchWord} keyword={keyword} />
			))}
			{isLoading ? <FaSpinner className="spinner align-center" /> : <></>}
			{qty < total ? <span className="align-center">...</span> : <></>}
		</ul>
	) : (
		<></>
	);
};

export default Dropdown;
