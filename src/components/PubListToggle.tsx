import React from 'react';
import { useStore } from '@nanostores/react';
import { $pubListMode } from '~/data/stores';
import { ToggleGroup, ToggleGroupItem } from '~/components/ui/toggle-group';
import { TableProperties, StretchHorizontal } from 'lucide-react';

type Props = {};

const GenomeListToggle: React.FC<Props> = ({}) => {
	const pubListMode = useStore($pubListMode);

	return (
		<ToggleGroup
			type="single"
			value={pubListMode}
			onValueChange={(newVal) => {
				if (newVal) {
					$pubListMode.set(newVal);
				}
			}}
			className="border rounded"
		>
			<ToggleGroupItem value="cards">
				<StretchHorizontal size={16} />
			</ToggleGroupItem>
			<ToggleGroupItem value="table">
				<TableProperties size={16} />
			</ToggleGroupItem>
		</ToggleGroup>
	);
};

export default GenomeListToggle;
