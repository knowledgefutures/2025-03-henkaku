import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '~/components/ui/select';

type Props = {
	placeholder?: string;
	items: string[];
	value?: string;
	onChange?: any;
};

const BasicSelect: React.FC<Props> = ({
	placeholder,
	items,
	value,
	onChange,
}) => {
	return (
		<Select>
			<SelectTrigger className="bg-white">
				<SelectValue placeholder={placeholder || ''} />
			</SelectTrigger>
			<SelectContent>
				{items.map((item) => {
					return <SelectItem value={item}>{item}</SelectItem>;
				})}
			</SelectContent>
		</Select>
	);
};

export default BasicSelect;
