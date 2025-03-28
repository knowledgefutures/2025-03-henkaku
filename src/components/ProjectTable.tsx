import React from 'react';
import type { Project } from '~/types/pubs';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '~/components/ui/table';
import { getPublishedAtString } from '~/lib/pubs';
import { marked } from 'marked';

type Props = {
	pubs: Project[];
};

const ProjectTable: React.FC<Props> = ({ pubs }) => {
	return (
		<div className="border rounded">
			<Table>
				<TableHeader>
					<TableRow className="hover:bg-white whitespace-nowrap ">
						<TableHead>Title</TableHead>
						<TableHead>Stage</TableHead>
						<TableHead>Area</TableHead>
						<TableHead>Funded</TableHead>
						<TableHead>Updated on</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{pubs.map((pub, index) => {
						return (
							<TableRow
								key={pub.id}
								className={index % 2 === 0 ? '' : 'bg-muted/40'}
							>
								<TableCell className="font-medium">
									<a
										href={`/project/${pub.slug}`}
										dangerouslySetInnerHTML={{
											__html: marked.parse(pub.name),
										}}
									/>
								</TableCell>
								<TableCell>
									<span>{pub.stage}</span>
								</TableCell>
								<TableCell>
									<span>{pub.area.join(', ')}</span>
								</TableCell>
								<TableCell>
									<span>{pub.funded ? 'Yes' : 'No'}</span>
								</TableCell>
								<TableCell>
									<span className="whitespace-nowrap">
										{getPublishedAtString(pub)}
									</span>
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</div>
	);
};

export default ProjectTable;
