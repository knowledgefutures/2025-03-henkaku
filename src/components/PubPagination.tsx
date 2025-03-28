import React from 'react';
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '~/components/ui/pagination';

type Props = {
	pageNumber: number;
	maxPages: number;
};

export const getPageNumbers = (pageNumber: number, maxPages: number) => {
	/* This will show the `numberOfPagesToShow` pages around the  */
	/* currently selected page, making sure to not exceed max */
	const numberOfPagesToShow = 5;
	const pages: number[] = [];
	const totalPages = Array.from({ length: maxPages }, (_, i) => i + 1);
	const startPage = Math.max(1, pageNumber - 2);
	const endPage = Math.min(maxPages, pageNumber + 2);

	for (let i = startPage; i <= endPage; i++) {
		pages.push(i);
	}

	if (pages.length < numberOfPagesToShow) {
		if (startPage > 1) {
			const additionalPages = totalPages
				.slice(0, numberOfPagesToShow - pages.length)
				.filter((page) => !pages.includes(page));
			pages.unshift(...additionalPages);
		} else if (endPage < maxPages) {
			const additionalPages = totalPages
				.slice(-1 * numberOfPagesToShow + pages.length)
				.filter((page) => !pages.includes(page));
			pages.push(...additionalPages);
		}
	}
	return pages;
};

const PubPagination: React.FC<Props> = ({ pageNumber, maxPages }) => {
	const pageNumbers = getPageNumbers(pageNumber, maxPages);
	const prevPageNumber = pageNumber - 1;
	const nextPageNumber = pageNumber + 1;
	const updateSearchParams = (value: string) => {
		const params = new URLSearchParams(window.location.search);
		if (value) {
			params.set('page', value);
		} else {
			params.delete('page');
		}
		const paramsString = params.toString();
		window.history.replaceState(
			{},
			'',
			`${window.location.pathname}${paramsString.length ? '?' : ''}${paramsString}`
		);
		window.location.reload();
	};
	return (
		<Pagination>
			<PaginationContent>
				{!!prevPageNumber && (
					<PaginationItem>
						<PaginationPrevious
							onClick={() => {
								updateSearchParams(
									prevPageNumber === 1
										? ''
										: `${prevPageNumber}`
								);
							}}
						/>
					</PaginationItem>
				)}
				{pageNumbers.map((pn) => {
					return (
						<PaginationItem key={pn}>
							<PaginationLink
								isActive={pageNumber === pn}
								onClick={() => {
									updateSearchParams(pn === 1 ? '' : `${pn}`);
								}}
							>
								{pn}
							</PaginationLink>
						</PaginationItem>
					);
				})}
				{nextPageNumber <= maxPages && (
					<PaginationItem>
						<PaginationNext
							onClick={() => {
								updateSearchParams(`${nextPageNumber}`);
							}}
						/>
					</PaginationItem>
				)}
			</PaginationContent>
		</Pagination>
	);
};

export default PubPagination;
