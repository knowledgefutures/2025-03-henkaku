export default function DemoCard() {
	const title = '2025-03 Henkaku Knowledge Engine';
	// const writeupLink = 'https://www.knowledgefutures.org/rd/2025-03-henkaku';
	const githubLink = 'https://github.com/knowledgefutures/2025-03-henkaku';

	const links = [
		// { text: 'Writeup', href: writeupLink },
		{ text: 'Code', href: githubLink },
		{ text: 'Admin', href: '/admin/types' },
		{ text: 'Reset Demo', onClick: () => {}, skip: true },
	];

	return (
		<div className="max-w-96 bg-white border border-neutral-300 p-4 rounded text-neutral-700 text-sm">
			<div className="">
				<div className="float-left pr-2">
					<span>
						{/* prettier-ignore */}
						<svg width="26" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
							<g>
								<path d="M17 20.4V4.74853C17 4.5894 16.9368 4.43679 16.8243 4.32426L13.6757 1.17574C13.5632 1.06321 13.4106 1 13.2515 1H1.6C1.26863 1 1 1.26863 1 1.6V20.4C1 20.7314 1.26863 21 1.6 21H16.8243" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
								<path d="M13 1V4.4C13 4.73137 13.2686 5 13.6 5H17" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
								<path fillRule="evenodd" clipRule="evenodd" fill="black"d="M4.15047 11.6125C4.06492 11.5174 4.06492 11.3731 4.15047 11.2781L8.92549 5.97146C8.9729 5.91877 9.04045 5.88868 9.11133 5.88868H10.382C10.5984 5.88868 10.7126 6.14502 10.5678 6.3059L6.09376 11.2781C6.00822 11.3731 6.00822 11.5174 6.09376 11.6125L10.5678 16.5847C10.7126 16.7455 10.5984 17.0019 10.382 17.0019H9.11133C9.04045 17.0019 8.9729 16.9718 8.92549 16.9191L4.15047 11.6125Z" />
								<path fillRule="evenodd" clipRule="evenodd" fill="black" d="M8.03706 11.6127C7.95151 11.5176 7.95151 11.3733 8.03706 11.2783L8.4621 10.8059C8.50951 10.7532 8.57705 10.7231 8.64793 10.7231H10.8454C11.0618 10.7231 11.176 10.4668 11.0312 10.3059L10.1221 9.29555C10.0365 9.20047 10.0365 9.05617 10.1221 8.9611L10.7574 8.25504C10.8567 8.14467 11.0298 8.14467 11.1291 8.25504L13.8495 11.2783C13.935 11.3733 13.935 11.5176 13.8495 11.6127L11.1291 14.6359C11.0298 14.7463 10.8567 14.7463 10.7574 14.6359L10.1221 13.9299C10.0365 13.8348 10.0365 13.6905 10.1221 13.5954L11.0312 12.5851C11.176 12.4242 11.0618 12.1678 10.8454 12.1678H8.64794C8.57706 12.1678 8.50951 12.1377 8.4621 12.0851L8.03706 11.6127Z" />
							</g>
						</svg>
					</span>
				</div>
				<div>
					<div className="font-bold leading-none mb-0.5">{title}</div>
					<div className="leading-snug">
						This is a demo site built by{' '}
						<a href="https://www.knowledgefutures.org">
							Knowledge Futures
						</a>
						. Content and names on this site may be fabricated for
						the sake of demonstration.
					</div>
				</div>
			</div>

			<div className="font-mono mt-4 pt-4 border-t border-t-neutral-300 flex space-x-4 justify-between">
				{links
					.filter((item) => !item.skip)
					.map(({ text, href, onClick }) => {
						if (href) {
							return (
								<a key={text} href={href}>
									{text}
								</a>
							);
						}
						return (
							<button
								className="hover:underline"
								onClick={onClick}
								key={text}
							>
								{text}
							</button>
						);
					})}
			</div>
		</div>
	);
}
