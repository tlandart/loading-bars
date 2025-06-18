/* Load bars into memory, like in https://svelte.dev/tutorial/kit/the-form-element. And then save it to a JSON or XML file. */

export interface Bar {
	id: string;
	start: number;
	end: number;
	name: string;
}

const bars: Bar[] = [];

export function getBars(obj: Bar[]) {
	while (bars.length > 0) bars.pop();
	obj.forEach((value) => {
		bars.push(value);
	});
	return bars;
}

export function createBar(start: number, end: number, name: string) {
	bars.push({ id: crypto.randomUUID(), start, end, name });
	return bars;
}

export function deleteBar(id: string) {
	const index = bars.findIndex((bar) => bar.id === id);
	if (index !== -1) bars.splice(index, 1);
	return bars;
}
