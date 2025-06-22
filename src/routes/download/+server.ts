import * as db from '$lib/server/database';

export const GET = async () => {
	// Simulated file content – you can use Buffer for binary or real files
	const jsonFile = JSON.stringify(db.getBars());

	return new Response(jsonFile, {
		headers: {
			'Content-Type': 'application/json',
			'Content-Disposition': `attachment; filename="loading-bars-save.json"`
		}
	});
};
