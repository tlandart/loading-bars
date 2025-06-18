<script lang="ts">
	import { enhance } from '$app/forms';
	let startNowToggle = $state(true);
	let detailedFormToggle = $state(true);

	// for default values in detailed form
	let now = new Date();
	let dateStringStart = now.toISOString().slice(0, -5);
	let dateStringEnd = new Date(now.getTime() + 10 * 60000).toISOString().slice(0, -5);
</script>

<button
	onclick={() => {
		detailedFormToggle = !detailedFormToggle;
	}}
>
	{#if detailedFormToggle}
		Detailed
	{:else}
		Quick
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
			e.target.select();
		}}
		value="New Bar"
	/>
	<input
		id="startnow"
		name="startnow"
		type="checkbox"
		placeholder="test"
		autocomplete="off"
		bind:checked={startNowToggle}
	/>
	<label for="startnow">Start on submit</label>
	{#if detailedFormToggle}
		{#if !startNowToggle}
			<label for="startdatetime">Start</label>
			<input
				id="startdatetime"
				name="startdatetime"
				type="datetime-local"
				value={dateStringStart}
			/>
		{/if}
		<label for="enddatetime">End</label>
		<input id="enddatetime" name="enddatetime" type="datetime-local" value={dateStringEnd} />
		<input type="submit" />
	{:else}
		{#if !startNowToggle}
			<header>Start in</header>
			<input
				id="quickstarthou"
				name="quickstarthou"
				type="number"
				min="0"
				max="99"
				defaultValue="0"
				onclick={(e) => {
					e.target.select();
				}}
			/>
			<label for="quickstarthou">hours,</label>
			<input
				id="quickstartmin"
				name="quickstartmin"
				type="number"
				min="0"
				max="59"
				defaultValue="10"
				onclick={(e) => {
					e.target.select();
				}}
			/>
			<label for="quickstartmin">minutes,</label>
			<input
				id="quickstartsec"
				name="quickstartsec"
				type="number"
				min="0"
				max="59"
				defaultValue="0"
				onclick={(e) => {
					e.target.select();
				}}
			/>
			<label for="quickstartsec">seconds</label>
		{/if}
		<header>End in</header>
		<input
			id="quickendhou"
			name="quickendhou"
			type="number"
			min="0"
			max="99"
			defaultValue="0"
			onclick={(e) => {
				e.target.select();
			}}
		/>
		<label for="quickendhou">hours,</label>
		<input
			id="quickendmin"
			name="quickendmin"
			type="number"
			min="0"
			max="59"
			defaultValue="10"
			onclick={(e) => {
				e.target.select();
			}}
		/>
		<label for="quickendmin">minutes,</label>
		<input
			id="quickendsec"
			name="quickendsec"
			type="number"
			min="0"
			max="59"
			defaultValue="0"
			onclick={(e) => {
				e.target.select();
			}}
		/>
		<label for="quickendsec">seconds</label>
		<input type="submit" />
	{/if}
</form>

<style>
	label,
	header {
		color: white;
	}
</style>
