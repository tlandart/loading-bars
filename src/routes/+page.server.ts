import type { Bar } from '$lib/server/database';
import * as db from '$lib/server/database';

let bars: Bar[] = [];

export function load() {
	return {
		bars: bars
	};
}

function isValidObj(obj: any) {
	// checks if obj is of type Bar[]
	// this seems janky, idk if there is a better way to make sure the passed object is of type Bar[]
	console.log('validating obj');
	if (!Array.isArray(obj)) {
		console.log('false');
		return false;
	}
	for (let o of obj) {
		if (
			!('id' in o && 'start' in o && 'end' in o && 'name' in o) ||
			typeof o['id'] !== 'string' ||
			typeof o['start'] !== 'number' ||
			typeof o['end'] !== 'number' ||
			typeof o['name'] !== 'string'
		) {
			console.log('false');
			return false;
		}
	}
	console.log('true');
	return true;
}

export const actions = {
	upload: async ({ cookies, request }) => {
		const data = await request.formData();
		const file = data.get('userfile') as File;
		const text = await file.text();
		if (text) {
			let obj: Bar[] = JSON.parse(text);
			if (isValidObj(obj)) {
				bars = db.getBars(obj);
			}
		}
	},
	create: async ({ cookies, request }) => {
		const data = await request.formData();
		const start = Number(data.get('start'));
		const end = Number(data.get('end'));
		const name = data.get('name') as string;
		bars = db.createBar(start, end, name);
	}
};
