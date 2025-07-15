import * as db from '$lib/server/database';
import { fail } from '@sveltejs/kit';

let bars: db.Bar[] = [];
let groups: db.Group[] = [];

export function load() {
	return {
		bars: bars,
		groups: groups
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
				const x = db.getFile(obj);
				bars = x.bars;
				groups = x.groups;
				// note that on a form action, the load() function runs again, so our update of bars and groups will be propagated
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
	createbar: async ({ cookies, request }) => {
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

		let groups: string[] = data.getAll('groups') as string[];

		try {
			bars = db.createBar(start, end, name, groups);
			console.log(`Successfully created bar ${name}`);
			return { success: true };
		} catch (error) {
			console.error((<Error>error).message);
			return fail(406, {
				success: false,
				error: (<Error>error).message
			});
		}
	},
	deletebar: async ({ cookies, request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;

		try {
			bars = db.deleteBar(id);
			console.log(`Successfully deleted bar id: ${id}`);
			return { success: true };
		} catch (error) {
			console.error((<Error>error).message);
			return fail(407, {
				success: false,
				error: (<Error>error).message
			});
		}
	},
	editbar: async ({ cookies, request }) => {
		/* request.formData() should return:
			editid (string)
			editname (string)
			if editabsoluteform=true:
				editstartdatetime (ISO date string)
				editenddatetime (ISO date string)
			else:
				editrelativestarthou (-99-99)
				editrelativestartmin (-59-59)
				editrelativestartsec (-59-59)
				editrelativeendhou (-99-99)
				editrelativeendmin (-59-59)
				editrelativeendsec (-59-59)
		*/
		const data = await request.formData();
		const id = data.get('editid') as string;

		let oldStart = JSON.parse(data.get('editoldstart') as string) as number;
		let oldEnd = JSON.parse(data.get('editoldend') as string) as number;
		let start: number | undefined,
			end: number | undefined,
			name: string | undefined = data.get('editname') as string | undefined;

		const absoluteForm = JSON.parse(data.get('editabsoluteform') as string) as boolean;

		if (absoluteForm) {
			let startDateTime = data.get('editstartdatetime') as string;
			start = new Date(startDateTime).getTime();
			let endDateTime = data.get('editenddatetime') as string;
			end = new Date(endDateTime).getTime();
		} else {
			let relativeStartHou = JSON.parse(data.get('editrelativestarthou') as string) as number;
			let relativeStartMin = JSON.parse(data.get('editrelativestartmin') as string) as number;
			let relativeStartSec = JSON.parse(data.get('editrelativestartsec') as string) as number;
			start =
				oldStart + relativeStartHou * 3600000 + relativeStartMin * 60000 + relativeStartSec * 1000;
			let relativeEndHou = JSON.parse(data.get('editrelativeendhou') as string) as number;
			let relativeEndMin = JSON.parse(data.get('editrelativeendmin') as string) as number;
			let relativeEndSec = JSON.parse(data.get('editrelativeendsec') as string) as number;
			end = oldEnd + relativeEndHou * 3600000 + relativeEndMin * 60000 + relativeEndSec * 1000;
		}

		try {
			bars = db.editBar(id, start, end, name);
			console.log(`Successfully edited bar ${name}`);
			return { success: true };
		} catch (error) {
			console.error((<Error>error).message);
			return fail(406, {
				success: false,
				error: (<Error>error).message
			});
		}
	},
	editgroupsbar: async ({ cookies, request }) => {
		const data = await request.formData();
		const id = data.get('editid') as string;
		let groups: string[] = data.getAll('groups') as string[];

		try {
			bars = db.editGroupsBar(id, groups);
			console.log(`Successfully edited groups for bar id: ${id}`);
			return { success: true };
		} catch (error) {
			console.error((<Error>error).message);
			return fail(406, {
				success: false,
				error: (<Error>error).message
			});
		}
	},
	movebar: async ({ cookies, request }) => {
		const data = await request.formData();
		const id1 = data.get('id1') as string;
		const id2 = data.get('id2') as string;

		try {
			bars = db.moveBar(id1, id2);
			console.log(`Successfully moved bar id: ${id1} to bar id: ${id2}`);
			return { success: true };
		} catch (error) {
			console.error((<Error>error).message);
			return fail(406, {
				success: false,
				error: (<Error>error).message
			});
		}
	},
	creategroup: async ({ cookies, request }) => {
		const data = await request.formData();
		let name = data.get('groupname') as string;
		let color = data.get('groupcolor') as string;

		try {
			groups = db.createGroup(name, color);
			console.log(`Successfully created group ${name}`);
			return { success: true };
		} catch (error) {
			console.error((<Error>error).message);
			return fail(406, {
				success: false,
				error: (<Error>error).message
			});
		}
	},
	deletegroup: async ({ cookies, request }) => {
		const data = await request.formData();
		let id = data.get('id') as string;

		try {
			const x = db.deleteGroup(id);
			bars = x.bars;
			groups = x.groups;
			console.log(`Successfully deleted group id: ${id}`);
			return { success: true };
		} catch (error) {
			console.error((<Error>error).message);
			return fail(406, {
				success: false,
				error: (<Error>error).message
			});
		}
	},
	editgroup: async ({ cookies, request }) => {
		const data = await request.formData();
		let id = data.get('id') as string;
		let name = data.get('groupname') as string;
		let color = data.get('groupcolor') as string;

		try {
			groups = db.editGroup(id, name, color);
			console.log(`Successfully edited group id: ${id}`);
			return { success: true };
		} catch (error) {
			console.error((<Error>error).message);
			return fail(406, {
				success: false,
				error: (<Error>error).message
			});
		}
	}
};
