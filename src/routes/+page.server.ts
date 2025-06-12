import * as db from '$lib/server/database';

export function load() {
	return {
		// see https://svelte.dev/tutorial/kit/page-data
		// here is where we load the users data into an object
		bars: db.getBars('')
	};
}

// see https://svelte.dev/tutorial/kit/the-form-element
// and https://svelte.dev/tutorial/kit/named-form-actions
// for when we send the users data to the db (probably just gonna be a local file)
