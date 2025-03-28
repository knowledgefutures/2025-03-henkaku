export async function GET() {
	const env = import.meta.env;
	const disallowAll =
		env.ALLOW_ROBOTS !== 'true' ? 'Disallow: /' : 'Allow: /';
	const robotsTxt = `
		User-agent: *
		${disallowAll}
	`;

	const trimmedRobotsTxt = robotsTxt.replace(/^\t+/gm, '').trim();
	return new Response(trimmedRobotsTxt, {
		headers: {
			'Content-Type': 'text/plain',
		},
	});
}
