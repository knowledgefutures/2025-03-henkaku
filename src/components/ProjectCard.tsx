import { marked } from 'marked';
import { getPublishedAtString } from '~/lib/pubs';
import type { Project } from '~/types/pubs';

type Props = {
	pub: Project;
};

const ProjectCard: React.FC<Props> = ({ pub }) => {
	return (
		<div
			className={`space-y-2 rounded overflow-hidden border border-neutral-300 p-4 not-prose`}
		>

			<div className="text-xl font-bold text-sky-500">
				<a href={`/project/${pub.slug}`}>{pub.name}</a>
			</div>
			<div className="text-sm flex items-center gap-2 my-2">
				<div className="font-bold">{pub.stage}</div>
				<div>|</div>
				<div>Last Updated: {getPublishedAtString(pub)}</div>
			</div>
			<div
				className="my-2"
				dangerouslySetInnerHTML={{
					__html:
						marked.parse(
							pub.projectDescription.split('Goals')[0]
						) || '',
				}}
			/>

			<div className="flex items-center gap-2">
				{pub.area.map((area, index) => {
					return (
						<>
							<div className="text-sky-500">{area}</div>
							{index !== pub.area.length - 1 && <div>|</div>}
						</>
					);
				})}
			</div>
		</div>
	);
};

export default ProjectCard;
