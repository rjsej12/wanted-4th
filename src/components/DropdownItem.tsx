import { splitTextWithKeyword } from '../utils/splitTextWithKeyword';

type DropdownItemProps = {
	searchWord: string;
	keyword: string;
	handleClick: (value: string) => () => Promise<void>;
};

const DropdownItem = ({ searchWord, keyword, handleClick }: DropdownItemProps) => {
	return (
		<li className="dropdown-item" onClick={handleClick(searchWord)}>
			{splitTextWithKeyword(searchWord, keyword).map((text, index) => (
				<span key={index} className={text === keyword ? 'accent-text' : ''}>
					{text}
				</span>
			))}
		</li>
	);
};

export default DropdownItem;
