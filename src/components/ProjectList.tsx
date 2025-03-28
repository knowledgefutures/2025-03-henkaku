import React from 'react';
import { useStore } from '@nanostores/react';
import { $pubListMode } from '~/data/stores';
import type { Project } from '~/types/pubs';
import ProjectCard from '~/components/ProjectCard';
import ProjectTable from '~/components/ProjectTable';
import PubPagination from '~/components/PubPagination';
import PubListToggle from '~/components/PubListToggle';
import { SquareDashed } from 'lucide-react';
import { getPublishedAt } from '~/lib/pubs';

type Props = {
	pubs: Project[];
	urlPageNumber?: number;
};

const ProjectList: React.FC<Props> = ({ pubs, urlPageNumber }) => {
	const pubListMode = useStore($pubListMode);
	const sortedPubs = pubs.sort((foo, bar) => {
		const dateA = new Date(getPublishedAt(foo)).getTime();
		const dateB = new Date(getPublishedAt(bar)).getTime();
		return dateB - dateA;
	});
	const urlParams = new URLSearchParams(window.location.search);
	const pageNumber =
		urlPageNumber ||
		(urlParams.get('page')
			? parseInt(urlParams.get('page') as string, 10)
			: 1);
	const pubsPerPage = 15;
	const startIndex = (pageNumber - 1) * pubsPerPage;
	const endIndex = startIndex + pubsPerPage;
	const currentPubs = sortedPubs.slice(startIndex, endIndex);
	const maxPages = Math.ceil(pubs.length / pubsPerPage);
	return (
		<div className="w-full overflow-hidden">
			<div className="space-y-2 md:space-y-0 md:flex justify-between items-center mb-8">
				<div className="font-bold bg-white/80 py-1 px-2 rounded">
					{pubs.length} {pubs.length === 1 ? 'project' : 'projects'}
				</div>
				<div className="flex space-x-4">
					{maxPages > 1 && (
						<div className="bg-white/80 rounded">
							<PubPagination
								pageNumber={pageNumber}
								maxPages={maxPages}
							/>
						</div>
					)}
					<div className="bg-white/80 rounded">
						<PubListToggle />
					</div>
				</div>
			</div>
			{pubListMode === 'cards' &&
				currentPubs.map((pub) => {
					return (
						<div key={pub.id} className="mb-6">
							<ProjectCard pub={pub} />
						</div>
					);
				})}
			{pubListMode === 'table' && <ProjectTable pubs={currentPubs} />}
			{!currentPubs.length && (
				<div className="flex flex-col items-center opacity-50 space-y-4 my-20">
					<SquareDashed size={96} className="" />
					<div className="text-xl font-bold uppercase">No Projects</div>
				</div>
			)}
		</div>
	);
};

export default ProjectList;
