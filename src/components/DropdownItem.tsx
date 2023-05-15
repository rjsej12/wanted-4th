import { splitTextWithKeyword } from '../utils/splitTextWithKeyword';

type DropdownItemProps = {
	searchWord: string;
	keyword: string;
};

const DropdownItem = ({ searchWord, keyword }: DropdownItemProps) => {
	return (
		<li className="dropdown-item">
			{splitTextWithKeyword(searchWord, keyword).map((text, index) => (
				<span key={index} className={text === keyword ? 'accent-text' : ''}>
					{text}
				</span>
			))}
		</li>
	);
};

export default DropdownItem;
