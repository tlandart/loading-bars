/* Load bars into a map, like in https://svelte.dev/tutorial/kit/the-form-element. And then save it to a JSON or XML file. */

interface Bar {
	start: number;
	end: number;
	name: string;
}

const bars: Bar[] = [];

export function getBars(filename: string) {
	if (bars.length <= 0) {
		// TODO load from filename
		bars.push({ start: 0, end: 1797552000000, name: 'Started at epoch, ends in 2027.' });
		bars.push({ start: Date.now(), end: Date.now() + 1000, name: '' });
		bars.push({ start: Date.now(), end: Date.now() + 120000, name: '' });
		bars.push({ start: Date.now(), end: Date.now() + 3600000, name: '' });
		bars.push({ start: Date.now(), end: Date.now() + 40000000, name: 'Time to wake up' });
		bars.push({
			start: 1732942800000,
			end: 1764496980000,
			name: 'Since nov 30 2024, until nov 30 2025'
		});
	}

	return bars;
}
