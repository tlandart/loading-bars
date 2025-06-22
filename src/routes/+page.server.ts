import type { Bar } from '$lib/server/database';
import * as db from '$lib/server/database';
import { fail } from '@sveltejs/kit';

let bars: Bar[] = [];

export function load() {
	return {
		bars: bars
	};
}

export const actions = {
	upload: async ({ cookies, request }) => {
		const data = await request.formData();
		const file = data.get('userfile') as File;
		const text = await file.text();
		if (text) {
			let obj = JSON.parse(text);
			try {
				bars = db.getBars(obj);
				// note that on a form action, the load() function runs again, so our update of bars will be propogated
				return { success: true };
			} catch (error) {
				console.error((<Error>error).message);
				return fail(405, {
					success: false,
					error: (<Error>error).message
				});
			}
		}
	},
	create: async ({ cookies, request }) => {
		/* request.formData() should return:
			name (string)
			if absoluteform=true:
				if startnow=TRUE:
					startdatetime (ISO date string)
				enddatetime (ISO date string)
			else:
				if startnow=TRUE:
					relativestarthou (0-99)
					relativestartmin (0-59)
					relativestartsec (0-59)
				relativeendhou (0-99)
				relativeendmin (0-59)
				relativeendsec (0-59)
		*/
		const data = await request.formData();
		const now = new Date();
		let start: number = -1,
			end: number,
			name: string; // what we'll get in the end

		name = data.get('name') as string;
		const absoluteForm = JSON.parse(data.get('absoluteform') as string) as boolean;
		const startNow = data.get('startnow') !== null;

		if (absoluteForm) {
			if (!startNow) {
				let startDateTime = data.get('startdatetime') as string;
				start = new Date(startDateTime).getTime();
			}
			let endDateTime = data.get('enddatetime') as string;
			end = new Date(endDateTime).getTime();
		} else {
			if (!startNow) {
				let relativeStartHou = JSON.parse(data.get('relativestarthou') as string) as number;
				let relativeStartMin = JSON.parse(data.get('relativestartmin') as string) as number;
				let relativeStartSec = JSON.parse(data.get('relativestartsec') as string) as number;
				start =
					now.getTime() +
					relativeStartHou * 3600000 +
					relativeStartMin * 60000 +
					relativeStartSec * 1000;
			}
			let relativeEndHou = JSON.parse(data.get('relativeendhou') as string) as number;
			let relativeEndMin = JSON.parse(data.get('relativeendmin') as string) as number;
			let relativeEndSec = JSON.parse(data.get('relativeendsec') as string) as number;
			end =
				now.getTime() + relativeEndHou * 3600000 + relativeEndMin * 60000 + relativeEndSec * 1000;
		}
		if (start === -1) start = now.getTime();

		try {
			bars = db.createBar(start, end, name);
			console.log('Successfully created bar "' + name + '"');
			return { success: true };
		} catch (error) {
			console.error((<Error>error).message);
			return fail(406, {
				success: false,
				error: (<Error>error).message
			});
		}
	},
	delete: async ({ cookies, request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;

		try {
			bars = db.deleteBar(id);
			console.log('Successfully deleted bar "' + id + '"');
			return { success: true };
		} catch (error) {
			console.error((<Error>error).message);
			return fail(407, {
				success: false,
				error: (<Error>error).message
			});
		}
	}
};
