<script lang="ts">
    import { genericPost } from "./queries";

    export let surveyData;
    export let survey;
    const handleVoteClick = async (event) => {
        // console.log(event.target.id)
        await genericPost("/api/vote", {optionId: event.target.id})
        window.location.href = "/umfragen"
    }
</script>
<p>{survey.title}</p>
{#each surveyData.optionen as opt}
{#if opt.umfrage === survey.id}
    <input type="button" on:click={handleVoteClick} class="button" id={opt.id} value={opt.title}>
{/if}
{/each}
