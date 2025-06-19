<script lang="ts">
	import { enhance } from '$app/forms';

	let { form } = $props();
	let startNowToggle = $state(true);
	let absoluteFormToggle = $state(true);

	// for default values in the absolute form
	const getDateStrings = () => {
		let now = new Date();
		now.setTime(now.getTime() - now.getTimezoneOffset() * 60000);
		let dateStringStart = now.toISOString().slice(0, -5);
		let dateStringEnd = new Date(now.getTime() + 10 * 60000).toISOString().slice(0, -5);
		return { dateStringStart, dateStringEnd };
	};
</script>

<button
	onclick={() => {
		absoluteFormToggle = !absoluteFormToggle;
	}}
>
	{#if absoluteFormToggle}
		Absolute
	{:else}
		Relative
	{/if}
</button>

<form method="POST" action="?/create" use:enhance>
	<label for="name">Name</label>
	<input
		id="name"
		name="name"
		type="text"
		autocomplete="off"
		onclick={(e) => {
			(e.target as HTMLInputElement).select();
		}}
		value="New Bar"
	/>
	<input name="absoluteform" type="hidden" value={absoluteFormToggle} />
	<input
		id="startnow"
		name="startnow"
		type="checkbox"
		bind:checked={startNowToggle}
		defaultChecked={startNowToggle}
	/>
	<label for="startnow">Start on submit</label>
	{#if absoluteFormToggle}
		{#if !startNowToggle}
			<label for="startdatetime">Start</label>
			<input
				id="startdatetime"
				name="startdatetime"
				type="datetime-local"
				step="2"
				defaultValue={getDateStrings().dateStringStart}
				required
			/>
		{/if}
		<label for="enddatetime">End</label>
		<input
			id="enddatetime"
			name="enddatetime"
			type="datetime-local"
			step="2"
			defaultValue={getDateStrings().dateStringEnd}
			required
		/>
	{:else}
		{#if !startNowToggle}
			<header>Start in</header>
			<input
				id="relativestarthou"
				name="relativestarthou"
				type="number"
				min="0"
				max="99"
				defaultValue="0"
				onclick={(e) => {
					(e.target as HTMLInputElement).select();
				}}
				required
			/>
			<label for="relativestarthou">hours,</label>
			<input
				id="relativestartmin"
				name="relativestartmin"
				type="number"
				min="0"
				max="59"
				defaultValue="0"
				onclick={(e) => {
					(e.target as HTMLInputElement).select();
				}}
				required
			/>
			<label for="relativestartmin">minutes,</label>
			<input
				id="relativestartsec"
				name="relativestartsec"
				type="number"
				min="0"
				max="59"
				defaultValue="0"
				onclick={(e) => {
					(e.target as HTMLInputElement).select();
				}}
				required
			/>
			<label for="relativestartsec">seconds</label>
		{/if}
		<header>End in</header>
		<input
			id="relativeendhou"
			name="relativeendhou"
			type="number"
			min="0"
			max="99"
			defaultValue="0"
			onclick={(e) => {
				(e.target as HTMLInputElement).select();
			}}
			required
		/>
		<label for="relativeendhou">hours,</label>
		<input
			id="relativeendmin"
			name="relativeendmin"
			type="number"
			min="0"
			max="59"
			defaultValue="10"
			onclick={(e) => {
				(e.target as HTMLInputElement).select();
			}}
			required
		/>
		<label for="relativeendmin">minutes,</label>
		<input
			id="relativeendsec"
			name="relativeendsec"
			type="number"
			min="0"
			max="59"
			defaultValue="0"
			onclick={(e) => {
				(e.target as HTMLInputElement).select();
			}}
			required
		/>
		<label for="relativeendsec">seconds</label>
	{/if}
	<input type="submit" />
</form>

<style>
	label,
	header {
		color: white;
	}
</style>
