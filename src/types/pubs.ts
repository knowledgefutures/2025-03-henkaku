export interface Project {
	id: string;
	name: string;
	area: string[];
	organization: Organization[];
	outputs: string[];
	projectDescription: string;
	region: string[];
	researchLifecycleStage: string[];
	website: string;

	slug: string;
	currentStageId: string;
	stage: string[];
	updatedAt: string;
	createdAt: string;
	launchDate?: string;
	email?: string;
	funded: boolean;
	logo?: string;
}

export interface Profile {
	id: string;
	fullName: string;
	department: string;
	email: string;
	oRCID: string;
	organization: string;
	title: string;
}

export interface Organization {
	id: string;
	logo?: string;
	name: string;
	updatedAt: string;
	createdAt: string;
	currentStageId?: string;
	slug: string;
}

export type PubType = {
	name: string;
	fields: { key: string; value: string }[];
};