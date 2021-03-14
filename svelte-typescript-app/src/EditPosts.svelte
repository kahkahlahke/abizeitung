<script lang="ts">
import EditStudent from "./EditStudent.svelte";
import { getAllStudents, getMe } from "./queries";

    const promise = getMe()
    const allStudents = getAllStudents()
</script>

<div class="container">
    {#await promise}
        <p>loading...</p>
    {:then medata} 
        {#if medata.superuser}
            {#await allStudents}
                <p>loading...</p>
            {:then data} 
            <table  class="u-full-width">
                <tbody>

                {#each data as dat}
                    {#if !dat.superuser}
                        <EditStudent dat={dat} />
                    {/if}
                {/each}
                </tbody>

            </table>
            {/await}
        {:else}
            <p>you shouldn't be here :/</p>
        {/if}
    {/await}
</div>

<style>
    div{
    
		text-align: left;
		font-size: small;
		font-family: "Ubuntu";
	}
</style>