/* This file is used to grab all the pub content from the PubPub */
/* Platform API. It's called and used by ./pubs and ./narratives */
/* to build out the getPubs() and getNarratives() functions      */
import { fileURLToPath } from 'url';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import type { Project, Profile, Organization } from '~/types/pubs';

const communitySlug = process.env.COMMUNITY_SLUG;

const baseHeaders = {
	Authorization: `Bearer ${process.env.PUBPUB_API_KEY}`,
	Prefer: 'return=representation',
	Accept: '*/*',
	'user-agent': 'airtable-gateway',
};

const jsonHeaders = {
	...baseHeaders,
	'Content-Type': 'application/json',
};

type PubTypeNames = 'PROFILE' | 'PROJECT' | 'ORGANIZATION';
type PubTypes = Project | Profile | Organization;
interface OptionsCallbackFunction {
	(pubObject: PubTypes[] | void[]): any;
}
interface getPubsOptions {
	pubTypeId: string;
	limit?: Number;
	fields: any;
	depth?: Number;
	callback?: OptionsCallbackFunction;
}

// Internal queryer
async function getPubs({
	pubTypeId,
	limit = 10000,
	fields,
	depth = 0,
	callback = async (pubObject: PubTypes | {}) => new Promise(() => {}),
}: getPubsOptions): Promise<PubTypes[] | void[]> {
	// const pubTypeId = process.env[`${pubType}_TYPE_ID`];
	return new Promise(async function (resolve, reject) {
		await fetch(
			`https://app.pubpub.org/api/v0/c/${communitySlug}/site/pubs?pubTypeId=${pubTypeId}&limit=${limit}${depth && `&withRelatedPubs=true&depth=${depth}`}`,
			{
				headers: baseHeaders,
				method: 'GET',
			}
		)
			.catch((error) => {
				console.error(error);
				reject(error);
			})
			.then((response) => {
				if (response) {
					response.json().then((res: any[]) => {
						if (!response.ok) {
							console.warn(response.status, res);
						}
						const pubsArray: PubTypes[] | void[] = res.map(
							(pubObject) => {
								const basePubObject: any = {
									id: pubObject.id,
									updatedAt: pubObject.updatedAt,
									createdAt: pubObject.createdAt,
									currentStageId: pubObject.stageId,
									slug:
										getFieldValuesBySlug(
											'slug',
											pubObject.values
										).length > 0
											? getFieldValuesBySlug(
													'slug',
													pubObject.values
												)[0].value
											: pubObject.id,
								};
								for (const field in fields) {
									if (typeof fields[field] === 'function') {
										basePubObject[field] = fields[field](
											pubObject.values
										);
									} else {
										const filteredFieldValues =
											getFieldValuesBySlug(
												fields[field],
												pubObject.values
											);
										basePubObject[field] =
											filteredFieldValues.length > 0
												? filteredFieldValues.length > 1
													? filteredFieldValues
													: filteredFieldValues[0]
															.value
												: null;
									}
								}
								return basePubObject;
							}
						);

						callback(pubsArray);
						resolve(pubsArray);
					});
				}
			});
	});
}

// Util functions
function getFieldValuesBySlug(slug: String, fieldValues: any[]): any[] {
	if (!fieldValues) {
		// console.warn('Didnt have field values');
		return [];
	}
	return fieldValues.filter((value) => {
		return value.fieldSlug === `${communitySlug}:${slug}`;
	});
}

function hydrateRelatedPubsFromValues(
	fieldSlug: String,
	pubValues: any[],
	pubs: PubTypes[]
) {
	return getFieldValuesBySlug(fieldSlug, pubValues).map((value) => {
		return pubs.filter((pub) => value.relatedPubId == pub.id)[0];
	});
}

function getPubById(pubsObject: PubTypes[], pubId: 'string') {
	return pubsObject.filter((pub) => {
		pub.id === pubId;
	})[0];
}
const getTypeIds = async () => {
	const response = await fetch(
		`https://app.pubpub.org/api/v0/c/${communitySlug}/site/pub-types`,
		{
			headers: baseHeaders,
			method: 'GET',
		}
	);
	if (response.ok) {
		const data: any[] = await response.json();
		/* prettier-ignore */
		return {
			project: data.find((t)=>t.name === 'Project').id,
			profile: data.find((t)=>t.name === 'Profile').id,
			organization: data.find((t)=>t.name === 'Organization').id,
		};
	} else {
		console.error('Failed to fetch type IDs', response.status);
		return {};
	}
};

const getStages = async () => {
	const response = await fetch(
		`https://app.pubpub.org/api/v0/c/${communitySlug}/site/stages`,
		{
			headers: baseHeaders,
			method: 'GET',
		}
	);
	if (response.ok) {
		const data: any[] = await response.json();
		/* prettier-ignore */
		return data;
	} else {
		console.error('Failed to fetch type IDs', response.status);
		return {};
	}
};

export type AllPubs = {
	projects: Project[];
	profiles: Profile[];
	organizations: Organization[];
};

// Main export
export const getAndFormatPubs = async (): Promise<AllPubs> => {
	const typeIds = await getTypeIds();
	try {
		const ProfilePubs: Profile[] = (await getPubs({
			pubTypeId: typeIds.profile,
			fields: {
				fullName: 'full-name',
				department: 'department',
				email: 'email',
				orcid: 'orcid',
				organization: 'organization',
				title: 'title',
			},
		})) as Profile[];
		const OrganizationPubs: Organization[] = (await getPubs({
			pubTypeId: typeIds.organization,
			fields: {
				logo: 'logo',
				name: 'name',
			},
		})) as Organization[];
		const ProjectPubs: Project[] = (await getPubs({
			pubTypeId: typeIds.project,
			fields: {
				name: 'name',
				slug: 'slug',
				website: 'website',
				projectDescription: 'project-description',
				area: 'area',
				stage: 'stage',
				researchLifecycleStage: 'research-lifecycle-stage',
				region: 'region',
				outputs: 'outputs',
				logo: 'logo',
				email: 'email',
				launchDate: 'launch-date',
				partnership: 'partnership',
				advocacyAndAwareness: 'advocacy-and-awareness',
				guidance: 'guidance',
				financialSupport: 'financial-support',
				volunteerSupport: 'volunteer-support',
				technicalSupport: 'technical-support',

				fundingDescription: 'funding-description',
				technicalDescription: 'technical-description',
				partnershipDescription: 'partnership-description',
				advocacyDescription: 'advocacy-description',
				guidanceDescription: 'guidance-description',
				volunteerDescription: 'volunteer-description',

				impactStatement: 'impact-statement',
				fundingSource: 'funding-source',
				organization: (values: any[]) =>
					hydrateRelatedPubsFromValues(
						'project-organization',
						values,
						OrganizationPubs
					),
			},
		})) as Project[];

		return {
			projects: ProjectPubs.map((project) => {
				/* Some area entries seem to be duplicated, so I dedupe here. */
				return {
					...project,
					funded: false,
				};
			}),
			profiles: ProfilePubs,
			organizations: OrganizationPubs,
		};
	} catch (err) {
		console.error(err);
		return { projects: [], profiles: [], organizations: [] };
	}
};

const main = async () => {
	return null;
	// const pubs = await getAndFormatPubs();
	// const __dirname = fileURLToPath(new URL('.', import.meta.url));
	// const filePath = join(__dirname, '../assets/allPubs.json');
	// await writeFile(filePath, JSON.stringify(pubs, null, 2));
	// console.log(`Pubs written to ${filePath}`);
};
main();
