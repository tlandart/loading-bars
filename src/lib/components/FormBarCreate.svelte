<script lang="ts">
	import { enhance } from '$app/forms';
	import GroupLabelHolder from '$lib/components/GroupLabelHolder.svelte';

	let { form, dialogClose = () => {}, groups } = $props();
	let startNowToggle = $state(true);
	let absoluteFormToggle = $state(false);

	let selectedGroups: string[] = $state([]);

	function handleWheel(event: WheelEvent & { currentTarget: EventTarget & HTMLInputElement }) {
		if (event.currentTarget !== document.activeElement) event.currentTarget.focus();
	}
</script>

<form
	method="POST"
	action="?/createbar"
	onsubmit={() => {
		dialogClose();
	}}
	use:enhance
>
	<input name="absoluteform" type="hidden" value={absoluteFormToggle} />
	<div class="formtopinputpanel">
		<label for="name">
			Name
			<!-- Autofocus is maybe not the best idea but it makes it faster to create -->
			<!-- svelte-ignore a11y_autofocus -->
			<input
				id="name"
				name="name"
				type="text"
				autocomplete="off"
				onfocus={(e) => {
					(e.target as HTMLInputElement).select();
				}}
				value="New Bar"
				required
				autofocus
			/>
		</label>
		<label for="startnow">
			Start on submit
			<input
				id="startnow"
				name="startnow"
				type="checkbox"
				bind:checked={startNowToggle}
				defaultChecked={startNowToggle}
			/>
		</label>
	</div>
	<button
		class="formtogglebutton"
		type="button"
		onclick={(e) => {
			e.preventDefault();
			absoluteFormToggle = !absoluteFormToggle;
		}}
	>
		{#if absoluteFormToggle}
			<div class="formtogglebuttonbg">Relative</div>
			<div class="formtogglebuttonabsolute">Absolute</div>
		{:else}
			<div class="formtogglebuttonrelative">Relative</div>
			<div class="formtogglebuttonbg">Absolute</div>
		{/if}
	</button>
	{#if absoluteFormToggle}
		<div class="forminputpanelholder">
			{#if !startNowToggle}
				<label for="startdatetime">Start</label>
				<input id="startdatetime" name="startdatetime" type="datetime-local" step="1" required />
			{/if}
			<label for="enddatetime">End</label>
			<input
				id="enddatetime"
				name="enddatetime"
				type="datetime-local"
				step="1"
				required
				style:margin-bottom="11px"
			/>
		</div>
	{:else}
		<div class="forminputpanelwrapper">
			{#if !startNowToggle}
				<div class="forminputpanelholder">
					<header>Start in</header>
					<div class="forminputpanel">
						<div class="forminput">
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
								onwheel={handleWheel}
								required
							/>
							<label for="relativestarthou">hours</label>
						</div>
						<div class="forminput">
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
								onwheel={handleWheel}
								required
							/>
							<label for="relativestartmin">minutes</label>
						</div>
						<div class="forminput">
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
								onwheel={handleWheel}
								required
							/>
							<label for="relativestartsec">seconds</label>
						</div>
					</div>
				</div>
			{/if}
			<div class="forminputpanelholder">
				<header>End in</header>
				<div class="forminputpanel">
					<div class="forminput">
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
							onwheel={handleWheel}
							required
						/>
						<label for="relativeendhou">hours</label>
					</div>
					<div class="forminput">
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
							onwheel={handleWheel}
							required
						/>
						<label for="relativeendmin">minutes</label>
					</div>
					<div class="forminput">
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
							onwheel={handleWheel}
							required
						/>
						<label for="relativeendsec">seconds</label>
					</div>
				</div>
			</div>
		</div>
	{/if}
	{#each groups as group}
		<input
			name="groups"
			type="checkbox"
			value={group.id}
			checked={selectedGroups.includes(group.id)}
			defaultChecked={selectedGroups.includes(group.id)}
		/>
	{/each}
	<GroupLabelHolder {groups} bind:selectedGroups />
	<input type="submit" value="Confirm" />
</form>

{#if form?.error}
	<p class="error">{form.error}</p>
{/if}

<style>
	@import '$lib/shared';

	.formtopinputpanel {
		display: flex;
		flex-direction: column;
	}

	.formtopinputpanel > label {
		margin: 5px auto;
	}

	input[name='groups'] {
		display: none;
	}
</style>
