import * as db from '$lib/server/database';

export const GET = async () => {
	const jsonFile = JSON.stringify(db.getFile());

	return new Response(jsonFile, {
		headers: {
			'Content-Type': 'application/json',
			'Content-Disposition': `attachment; filename="loading-bars-save.json"`
		}
	});
};
