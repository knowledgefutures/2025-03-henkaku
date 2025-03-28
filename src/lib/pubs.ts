import allPubsApi from '~/assets/allPubs.json';
import type { Project, Organization, Profile } from '~/types/pubs';
import type { AllPubs } from './api';

export const getProjects = (): Project[] => {
	return (allPubsApi as unknown as AllPubs).projects as Project[];
};

export const getProfiles = (): Profile[] => {
	return allPubsApi.profiles as Profile[];
};

export const getOrganizations = (): Organization[] => {
	return (allPubsApi as unknown as AllPubs).organizations as Organization[];
};

export const getPublishedAt = (project: Project): string => {
	// return pub.publishedAt || pub.versions[0].createdAt;
	return project.createdAt;
};

export const getPublishedAtString = (
	project: Project,
	options?: Intl.DateTimeFormatOptions
): string => {
	const publishedAt = getPublishedAt(project);
	return formatDate(publishedAt, options);
};

export const formatDate = (
	timestamp: string,
	options?: Intl.DateTimeFormatOptions
): string => {
	const setOptions = options || {
		month: 'short',
		day: '2-digit',
		year: 'numeric',
		timeZone: 'UTC',
	};
	return new Date(timestamp).toLocaleString('en-US', setOptions);
};
