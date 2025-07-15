/* Load bars into memory, like in https://svelte.dev/tutorial/kit/the-form-element. And then save it to a JSON or XML file. */

export interface Bar {
	id: string;
	start: number;
	end: number;
	name: string;
	groups: string[]; // array of group ids
}

export interface Group {
	id: string;
	name: string;
	color: string;
}

const bars: Bar[] = [];
const groups: Group[] = [];

function isValidObj(obj: any): boolean {
	/*  checks if obj is a valid save file
		this seems janky, idk if there is a better way to make sure the passed object is of type Bar[]
	*/
	console.log('Validating file...');
	if (
		!(obj['bars'] && obj['groups'] && Array.isArray(obj['bars']) && Array.isArray(obj['groups']))
	) {
		console.log('fail. required fields not present or are not arrays');
		return false;
	}
	let objBars = obj['bars'];
	let objGroups = obj['groups'];
	for (let o of objBars) {
		if (
			!('id' in o && 'start' in o && 'end' in o && 'name' in o && 'groups' in o) ||
			typeof o['id'] !== 'string' ||
			typeof o['start'] !== 'number' ||
			typeof o['end'] !== 'number' ||
			typeof o['name'] !== 'string' ||
			!Array.isArray(o['groups'])
		) {
			console.log('fail. bars object is not valid');
			return false;
		}
	}
	for (let o of objGroups) {
		if (
			!('id' in o && 'name' in o) ||
			typeof o['id'] !== 'string' ||
			typeof o['name'] !== 'string'
		) {
			console.log('fail. groups object is not valid');
			return false;
		}
	}
	console.log('success');
	return true;
}

export function getFile(obj?: any): { bars: Bar[]; groups: Group[] } {
	if (obj) {
		if (!isValidObj(obj)) throw new Error('Uploaded file is not a valid save.');
		while (bars.length > 0) bars.pop();
		(obj['bars'] as Bar[]).forEach((value) => {
			bars.push(value);
		});
		while (groups.length > 0) groups.pop();
		(obj['groups'] as Group[]).forEach((value) => {
			groups.push(value);
		});
	}
	return { bars, groups };
}

// BAR MANIPULATION FUNCTIONS

export function createBar(start: number, end: number, name: string, bargroups: string[]): Bar[] {
	if (start >= end) throw new Error('Bar cannot start after it ends.');
	console.log(bargroups);
	console.log(groups.map((val) => val.id));
	for (let group of bargroups) {
		if (!groups.map((val) => val.id).includes(group))
			throw new Error('Request contains invalid group ID(s).');
	}
	bars.push({ id: crypto.randomUUID(), start, end, name, groups: bargroups });
	return bars;
}

export function deleteBar(id: string): Bar[] {
	const index = bars.findIndex((bar) => bar.id === id);
	if (index === -1) throw new Error('ID ' + id + ' does not match an existing bar.');
	bars.splice(index, 1);
	return bars;
}

export function editBar(id: string, start?: number, end?: number, name?: string): Bar[] {
	const index = bars.findIndex((bar) => bar.id === id);
	if (index === -1) throw new Error('ID ' + id + ' does not match an existing bar.');

	if (start && end) {
		// start and end
		if (start >= end) throw new Error('Bar cannot start after it ends.');
		bars[index].start = start;
		bars[index].end = end;
	} else if (start) {
		// start and !end
		if (start >= bars[index].end) throw new Error('Bar cannot start after it ends.');
		bars[index].start = start;
	} else if (end) {
		// !start and end
		if (bars[index].start >= end) throw new Error('Bar cannot start after it ends.');
		bars[index].end = end;
	}

	if (name) bars[index].name = name;
	return bars;
}

export function editGroupsBar(id: string, groups?: string[]): Bar[] {
	const index = bars.findIndex((bar) => bar.id === id);
	if (index === -1) throw new Error('ID ' + id + ' does not match an existing bar.');
	if (groups) bars[index].groups = groups;
	return bars;
}

export function moveBar(id1: string, id2: string): Bar[] {
	/* Swaps bar id1 and bar id2's position. */

	if (id1 === id2) throw new Error(`ID1 ${id1} cannot equal ID2 ${id2}.`);
	if (bars.findIndex((bar) => bar.id === id1) === -1)
		throw new Error(`ID ${id1} does not match an existing bar.`);
	if (bars.findIndex((bar) => bar.id === id2) === -1)
		throw new Error(`ID ${id2} does not match an existing bar.`);

	// Delete id1, then put it back at index2
	const index1 = bars.findIndex((bar) => bar.id === id1);
	let temp = bars[index1];
	bars.splice(index1, 1);
	const index2 = bars.findIndex((bar) => bar.id === id2);
	if (index1 <= index2) bars.splice(index2 + 1, 0, temp);
	else bars.splice(index2, 0, temp);

	return bars;
}

// GROUP MANIPULATION FUNCTIONS

const isColor = (strColor: string) => {
	/* Checks if strColor is a valid CSS color
	   credit: https://stackoverflow.com/a/8027444 */
	return /^#[0-9A-F]{6}$/i.test(strColor);
};

export function createGroup(name: string, color?: string): Group[] {
	let groupColor = color === undefined ? '#ff0000' : color;
	if (!isColor(groupColor)) throw new Error(`Color '${groupColor}' is not a valid CSS color.`);
	groups.push({ id: crypto.randomUUID(), name, color: groupColor });
	return groups;
}

export function deleteGroup(id: string): { bars: Bar[]; groups: Group[] } {
	const index = groups.findIndex((group) => group.id === id);
	if (index === -1) throw new Error(`ID '${id}' does not match an existing group.`);
	groups.splice(index, 1);
	// delete the group from every bar
	for (let bar of bars) bar.groups = bar.groups.filter((group) => group !== id);
	return { bars, groups };
}

export function editGroup(id: string, name: string, color: string): Group[] {
	const index = groups.findIndex((group) => group.id === id);
	if (index === -1) throw new Error(`ID '${id}' does not match an existing group.`);
	groups[index].name = name;
	groups[index].color = color;
	return groups;
}
