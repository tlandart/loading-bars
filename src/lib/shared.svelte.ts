import { SvelteDate } from 'svelte/reactivity';
export const now = new SvelteDate(); // universal reactive current timestamp, which is shared by all loading bar animations (so each one doesn't have its own, which would be a waste, and so they all update at the same time)

// const id = setInterval(() => {
// 	now.setTime(Date.now());
// 	console.log('now:', now);
// }, 1000);
