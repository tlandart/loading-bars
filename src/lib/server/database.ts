/* Load bars into memory, like in https://svelte.dev/tutorial/kit/the-form-element. And then save it to a JSON or XML file. */

export interface Bar {
	id: string;
	start: number;
	end: number;
	name: string;
}

const bars: Bar[] = [];

function isValidObj(obj: any) {
	/*  checks if obj is of type Bar[]
		this seems janky, idk if there is a better way to make sure the passed object is of type Bar[]
	*/
	console.log('Validating file...');
	if (!Array.isArray(obj)) {
		console.log('fail');
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
			console.log('fail');
			return false;
		}
	}
	console.log('success');
	return true;
}

export function getBars(obj: any) {
	if (!isValidObj(obj)) throw new Error('Uploaded file is not a valid save.');
	while (bars.length > 0) bars.pop();
	(obj as Bar[]).forEach((value) => {
		bars.push(value);
	});
	return bars;
}

export function createBar(start: number, end: number, name: string) {
	if (start > end) throw new Error('Bar cannot start after it ends.');
	bars.push({ id: crypto.randomUUID(), start, end, name });
	return bars;
}

export function deleteBar(id: string) {
	const index = bars.findIndex((bar) => bar.id === id);
	if (index === -1) throw new Error('ID ' + id + ' does not match an existing bar.');
	bars.splice(index, 1);
	return bars;
}
