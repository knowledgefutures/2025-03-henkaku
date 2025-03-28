import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { Button } from '~/components/ui/button';
import { ListFilter } from 'lucide-react';
import { useState } from 'react';
import allAdminData from '~/assets/allPubs.json';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '~/components/ui/table';

type Props = {};

type AdminDataKeys = Extract<keyof typeof allAdminData, string>;

const AdminPubsTable = ({}: Props) => {
	const [tabValue, setTabValue] = useState<AdminDataKeys>('projects');
	const pubTypes = Object.keys(allAdminData) as AdminDataKeys[];
	const activeData = allAdminData[tabValue];
	return (
		<div>
			<div className="flex items-center justify-between">
				<Tabs
					value={tabValue}
					onValueChange={(newValue) => {
						setTabValue(newValue as AdminDataKeys);
					}}
					className="overflow-x-scroll my-6"
				>
					<TabsList>
						{/* <TabsTrigger value="All">All</TabsTrigger> */}
						{pubTypes.map((pubType) => {
							return (
								<TabsTrigger key={pubType} value={pubType}>
									{pubType}
								</TabsTrigger>
							);
						})}
					</TabsList>
				</Tabs>

				<Button variant="outline" size="sm" className="h-8 gap-1">
					<ListFilter className="h-3.5 w-3.5" />
					<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Filter</span>
				</Button>
			</div>
			<div className="border rounded">
				<Table>
					<TableHeader>
						<TableRow className="hover:bg-white whitespace-nowrap ">
							{Object.keys(activeData[0]).map((dataKey) => {
								return <TableHead key={dataKey}>{dataKey}</TableHead>;
							})}
						</TableRow>
					</TableHeader>
					<TableBody>
						{activeData.map((item, index) => {
							return (
								<TableRow
									key={index}
									className={index % 2 === 0 ? '' : 'bg-muted/40'}
								>
									{Object.values(item).map((value, index) => {
										return (
											<TableCell key={index} className="text-nowrap">
												{value || ''}
											</TableCell>
										);
									})}
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default AdminPubsTable;
