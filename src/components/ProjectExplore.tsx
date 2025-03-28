import ProjectList from '~/components/ProjectList';
import { useEffect, useRef, useState } from 'react';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Checkbox } from '~/components/ui/checkbox';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '~/components/ui/select';
import { Button } from '~/components/ui/button';
import type { Project } from '~/types/pubs';

type Props = {
	allProjects: Project[];
};

const defaultState = {
	query: '',
	stage: '',
	area: '',
	funded: '',
	output: '',
	region: '',
	status: '',
};
export type FilterState = typeof defaultState;
export type FilterKeys = keyof typeof defaultState;

const ProjectExplore = ({ allProjects }: Props) => {
	const allStages = Array.from(
		new Set(allProjects.flatMap((pub) => pub.researchLifecycleStage))
	);
	const allAreas = Array.from(
		new Set(allProjects.flatMap((pub) => pub.area))
	);
	const allStatuses = Array.from(
		new Set(allProjects.flatMap((pub) => pub.stage))
	);
	const allRegions = Array.from(
		new Set(allProjects.flatMap((pub) => pub.region))
	);
	const allOutputs = Array.from(
		new Set(allProjects.flatMap((pub) => pub.outputs))
	);
	const timeout = useRef<number | undefined>(undefined);
	const [clearPageOnChange, setClearPageOnChange] = useState(false);
	const [activePubs, setActivePubs] = useState(allProjects);
	const [filterStates, setFilterStates] = useState({
		query: '',
		stage: '',
		area: '',
		funded: '',
		output: '',
		region: '',
		status: '',
	});
	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const queryVal = params.get('q') || '';
		const stageVal = params.get('stage') || '';
		const areaVal = params.get('area') || '';
		const fundedVal = params.get('funded') || '';
		const outputVal = params.get('output') || '';
		const regionVal = params.get('region') || '';
		const statusVal = params.get('status') || '';
		const newFilterState = {
			query: queryVal,
			stage: stageVal,
			area: areaVal,
			funded: fundedVal,
			output: outputVal,
			region: regionVal,
			status: statusVal,
		};
		setFilterStates(newFilterState);
	}, []);
	useEffect(() => {
		const activePubs = allProjects.filter((pub) => {
			const { query, stage, area, funded, output, region, status } =
				filterStates;
			if (
				stage &&
				!pub.researchLifecycleStage?.some((curr) => curr === stage)
			) {
				return false;
			}
			if (area && !pub.area?.some((curr) => curr === area)) {
				return false;
			}
			if (output && !pub.outputs?.some((curr) => curr === output)) {
				return false;
			}
			if (region && !pub.region?.some((curr) => curr === region)) {
				return false;
			}
			if (status && !pub.stage?.some((curr) => curr === status)) {
				return false;
			}
			const fundedStatus = pub.funded;
			if (funded === 'funded' && !fundedStatus) {
				return false;
			}
			if (funded === 'not-funded' && fundedStatus) {
				return false;
			}

			if (
				pub.name.toLowerCase().includes(query.toLowerCase()) ||
				pub.projectDescription
					?.toLocaleLowerCase()
					.includes(query.toLowerCase())
			) {
				return true;
			}

			return false;
		});
		setActivePubs(activePubs);
		updateSearchParams();
	}, [filterStates]);
	const updateSearchParams = () => {
		const { query, stage, area, funded, output, status, region } =
			filterStates;
		const searchParamFields = [
			{ key: 'q', value: query },
			{ key: 'stage', value: stage },
			{ key: 'area', value: area },
			{ key: 'funded', value: funded },
			{ key: 'output', value: output },
			{ key: 'status', value: status },
			{ key: 'region', value: region },
		];
		if (clearPageOnChange) {
			searchParamFields.push({ key: 'page', value: '' });
		}
		clearTimeout(timeout.current);
		timeout.current = window.setTimeout(() => {
			const params = new URLSearchParams(window.location.search);
			searchParamFields.forEach(({ key, value }) => {
				params.set(key, value);
			});
			searchParamFields.forEach(({ key }) => {
				const value = params.get(key);
				if (value === '') {
					params.delete(key);
				}
			});
			const paramsString = params.toString();
			window.history.replaceState(
				{},
				'',
				`${window.location.pathname}${paramsString.length ? '?' : ''}${paramsString}`
			);
		}, 250);
	};

	return (
		<>
			<div>
				<div className="bg-neutral-100 border border-neutral-300 rounded mb-6 p-3 space-y-8">
					<div className="">
						<Label>Text search</Label>
						<Input
							className="bg-white"
							placeholder="Search..."
							value={filterStates.query}
							onChange={(evt) => {
								setClearPageOnChange(true);
								setFilterStates({
									...filterStates,
									query: evt.target.value,
								});
							}}
						/>
					</div>

					<div className="">
						<Label className="flex justify-between items-center h-6">
							<span className="">Project Area</span>{' '}
							{filterStates.area && (
								<Button
									variant="ghost"
									size="sm"
									className="opacity-70 h-4 p-2 bg-transparent hover:bg-neutral-200"
									onClick={() => {
										setClearPageOnChange(true);
										setFilterStates({
											...filterStates,
											area: '',
										});
									}}
								>
									clear
								</Button>
							)}
						</Label>
						<Select
							value={filterStates.area}
							onValueChange={(newVal) => {
								setClearPageOnChange(true);
								setFilterStates({
									...filterStates,
									area: newVal,
								});
							}}
						>
							<SelectTrigger className="bg-white text-black hover:border-neutral-400">
								<SelectValue
									placeholder={
										<span className="opacity-60">
											Select area
										</span>
									}
								/>
							</SelectTrigger>
							<SelectContent>
								{allAreas
									.filter((x) => !!x)
									.sort((foo, bar) => {
										return foo.localeCompare(bar);
									})
									.map((curr) => {
										return (
											<SelectItem key={curr} value={curr}>
												{curr}
											</SelectItem>
										);
									})}
								{/* <SelectItem value={'passed'}>
									<span className="flex items-center">
										<Award color="green" size={16} className="mr-1" /> Passed
									</span>
								</SelectItem>
								<SelectItem value={'failed'}>
									<span className="flex items-center">
										<SquareSlash color="red" size={16} className="mr-1" /> Not
										Passed
									</span>
								</SelectItem> */}
							</SelectContent>
						</Select>
					</div>

					<div className="">
						<Label className="flex justify-between items-center h-6">
							<span className="">Status</span>{' '}
							{filterStates.status && (
								<Button
									variant="ghost"
									size="sm"
									className="opacity-70 h-4 p-2 bg-transparent hover:bg-neutral-200"
									onClick={() => {
										setClearPageOnChange(true);
										setFilterStates({
											...filterStates,
											status: '',
										});
									}}
								>
									clear
								</Button>
							)}
						</Label>
						<Select
							value={filterStates.status}
							onValueChange={(newVal) => {
								setClearPageOnChange(true);
								setFilterStates({
									...filterStates,
									status: newVal,
								});
							}}
						>
							<SelectTrigger className="bg-white text-black hover:border-neutral-400">
								<SelectValue
									placeholder={
										<span className="opacity-60">
											Select status
										</span>
									}
								/>
							</SelectTrigger>
							<SelectContent>
								{allStatuses
									.filter((x) => !!x)
									.sort((foo, bar) => {
										return foo.localeCompare(bar);
									})
									.map((curr) => {
										return (
											<SelectItem key={curr} value={curr}>
												{curr}
											</SelectItem>
										);
									})}
							</SelectContent>
						</Select>
					</div>

					{/* <div className="">
						<Label className="flex justify-between items-center h-6">
							<span className="">Research Lifecycle Stage</span>{' '}
							{filterStates.stage && (
								<Button
									variant="ghost"
									size="sm"
									className="opacity-70 h-4 p-2 bg-transparent hover:bg-neutral-200"
									onClick={() => {
										setClearPageOnChange(true);
										setFilterStates({
											...filterStates,
											stage: '',
										});
									}}
								>
									clear
								</Button>
							)}
						</Label>
						<Select
							value={filterStates.stage}
							onValueChange={(newVal) => {
								setClearPageOnChange(true);
								setFilterStates({
									...filterStates,
									stage: newVal,
								});
							}}
						>
							<SelectTrigger className="bg-white text-black hover:border-neutral-400">
								<SelectValue
									placeholder={
										<span className="opacity-60">
											Select research lifecycle stage
										</span>
									}
								/>
							</SelectTrigger>
							<SelectContent>
								{allStages
									.filter((x) => !!x)
									.sort((foo, bar) => {
										return foo.localeCompare(bar);
									})
									.map((curr) => {
										return (
											<SelectItem key={curr} value={curr}>
												{curr}
											</SelectItem>
										);
									})}
							</SelectContent>
						</Select>
					</div>

					<div className="">
						<Label className="flex justify-between items-center h-6">
							<span className="">Output</span>{' '}
							{filterStates.output && (
								<Button
									variant="ghost"
									size="sm"
									className="opacity-70 h-4 p-2 bg-transparent hover:bg-neutral-200"
									onClick={() => {
										setClearPageOnChange(true);
										setFilterStates({
											...filterStates,
											output: '',
										});
									}}
								>
									clear
								</Button>
							)}
						</Label>
						<Select
							value={filterStates.output}
							onValueChange={(newVal) => {
								setClearPageOnChange(true);
								setFilterStates({
									...filterStates,
									output: newVal,
								});
							}}
						>
							<SelectTrigger className="bg-white text-black hover:border-neutral-400">
								<SelectValue
									placeholder={
										<span className="opacity-60">
											Select output
										</span>
									}
								/>
							</SelectTrigger>
							<SelectContent>
								{allOutputs
									.filter((x) => !!x)
									.sort((foo, bar) => {
										return foo.localeCompare(bar);
									})
									.map((curr) => {
										return (
											<SelectItem key={curr} value={curr}>
												{curr}
											</SelectItem>
										);
									})}
							</SelectContent>
						</Select>
					</div>

					<div className="">
						<Label className="flex justify-between items-center h-6">
							<span className="">Region</span>{' '}
							{filterStates.region && (
								<Button
									variant="ghost"
									size="sm"
									className="opacity-70 h-4 p-2 bg-transparent hover:bg-neutral-200"
									onClick={() => {
										setClearPageOnChange(true);
										setFilterStates({
											...filterStates,
											region: '',
										});
									}}
								>
									clear
								</Button>
							)}
						</Label>
						<Select
							value={filterStates.region}
							onValueChange={(newVal) => {
								setClearPageOnChange(true);
								setFilterStates({
									...filterStates,
									region: newVal,
								});
							}}
						>
							<SelectTrigger className="bg-white text-black hover:border-neutral-400">
								<SelectValue
									placeholder={
										<span className="opacity-60">
											Select region
										</span>
									}
								/>
							</SelectTrigger>
							<SelectContent>
								{allRegions
									.filter((x) => !!x)
									.sort((foo, bar) => {
										return foo.localeCompare(bar);
									})
									.map((curr) => {
										return (
											<SelectItem key={curr} value={curr}>
												{curr}
											</SelectItem>
										);
									})}
							</SelectContent>
						</Select>
					</div> */}

					<div className="">
						<Label className="flex justify-between items-center h-6">
							<span>Funding status</span>{' '}
							{filterStates.funded && (
								<Button
									variant="ghost"
									size="sm"
									className="opacity-70 h-4 p-2 bg-transparent hover:bg-neutral-200"
									onClick={() => {
										setClearPageOnChange(true);
										setFilterStates({
											...filterStates,
											funded: '',
										});
									}}
								>
									clear
								</Button>
							)}
						</Label>
						<Select
							value={filterStates.funded}
							onValueChange={(newVal) => {
								setClearPageOnChange(true);
								setFilterStates({
									...filterStates,
									funded: newVal,
								});
							}}
						>
							<SelectTrigger className="bg-white text-black hover:border-neutral-400">
								<SelectValue
									placeholder={
										<span className="opacity-60">
											Select funding status
										</span>
									}
								/>
							</SelectTrigger>
							<SelectContent>
								<SelectItem value={'funded'}>
									<span className="flex items-center">
										Funded
									</span>
								</SelectItem>
								<SelectItem value={'not-funded'}>
									<span className="flex items-center">
										Not funded
									</span>
								</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
			</div>
			<ProjectList
				pubs={activePubs}
				urlPageNumber={clearPageOnChange ? 1 : undefined}
			/>
		</>
	);
};

export default ProjectExplore;
