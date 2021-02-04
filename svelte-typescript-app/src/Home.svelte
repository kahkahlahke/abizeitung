<script lang="ts">
	import Schueler from "./Schueler.svelte";
	

	const main = async () => {
		const rawResponse = await fetch("http://localhost:3232/get-students");
		const data = await rawResponse.json()
		return data;
	}

	const getMe = async () => {
		const rawResponse = await fetch("http://localhost:3232/me-query", {credentials: "include"});
		const data = await rawResponse.json()
		return data;
	}	
	const mePromise = getMe();
	const promise = main();

</script>

<main>
	<h1>Abizeitung Coggers</h1>

	<div class="container">
		<p class="hello-p">{#await mePromise}
			loading...
		{:then data} 
			Hallo {data.name}
		{/await}</p>
		{#await promise}
			<p>waitin...</p>
		{:then data} 
		<table  class="u-full-width">
			<tbody>
			{#each data as dat}

					<Schueler studentData={dat} />

			{/each}
		</tbody>

	</table>
		{/await}
	</div>
</main>
<style>
	main {
		font-family: "Ubuntu";
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