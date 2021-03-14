<script lang="ts">
	import { getAllStudents, getMe } from "./queries";

	import Schueler from "./Schueler.svelte";
	




	const mePromise = getMe();
	const promise = getAllStudents();

</script>

<main>
	<h1>Abizeitung Coggers</h1>

	<div class="container">
		<p class="hello-p">{#await mePromise}
			loading...
		{:then data} 
			<p>Hallo {data.name}</p>
			{#if data.superuser}
				<a href="/edit-posts">Edit Posts</a>
			{/if}
		{/await}</p>
		{#await promise}
			<p>waitin...</p>
		{:then data} 
		<table  class="u-full-width">
			<tbody>
			{#each data as dat, i}

					<Schueler studentData={dat} index={i+1} />

			{/each}
		</tbody>

	</table>
		{/await}
	</div>
</main>
<style>
	main {
		padding: 1em;
		max-width: 240px;

	}

	h1 {
		text-align: center;
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 5em;
		font-weight: 50;
	}
	div{
		text-align: left;
		font-size: small;
		font-family: inherit;
	}
	.hello-p{
		text-align: center;
	}



	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>