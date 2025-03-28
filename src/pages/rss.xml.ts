import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import communityConfig from '~/communityConfig.json';
import { getProjects } from '~/lib/pubs';

export function GET(context: APIContext) {
	const projects = getProjects();
	return rss({
		title: communityConfig.title,
		description: communityConfig.description,
		site: context.site || communityConfig.siteUrl,
		xmlns: {
			dc: 'http://purl.org/dc/elements/1.1/',
		},
		items: projects.map((pub: any) => {
			return {
				title: pub.title,
				link: `/project/${pub.slug}`,
				// pubDate: new Date(getPublishedAt(pub)),
				// description: pub.description || '',
				// categories: [...pub.narratives, ...pub.tags].map(
				// 	(x) => x.title
				// ),
				// customData: pub.contributors
				// 	.map((x) => `<dc:creator>${x.fullName}</dc:creator>`)
				// 	.join(''),
			};
		}),
	});
}
