<script lang="ts">
import HasNotVoted from "./HasNotVoted.svelte";
import HasVoted from "./HasVoted.svelte";
import { genericGet, genericPost, getMe } from "./queries";

    let meId: number | undefined;
    let isSuperuser: boolean;
    let surveyData: any;

    getMe().then(data => {
        isSuperuser = data.superuser;
        meId = data._id;
    })
    genericGet("/api/get-surveys").then(data => {
        surveyData = data;
    })

    const hasVotedSurvey = (surveyId) => {

        console.log(surveyData)
        for(let i = 0; i < surveyData.optionen.length; i++){
            if(surveyData.optionen[i].umfrage === surveyId){
                
                for(let j = 0; j < surveyData.optionen[i].voters.length; j++){
                    if(surveyData.optionen[i].voters[j] === meId){
                        return true;
                    }
                }
            }
        }
        return false;
    }
</script>

<div class="container">
    {#if meId === undefined}
        <p>Bitte melde dich zuerst an.</p>
        {:else}

            {#if isSuperuser}
                <p><a href="/umfrage-edit">Neue Umfrage erstellen</a></p>
            {/if}
            {#if surveyData !== undefined}
                {#each surveyData.umfragen as survey}
                    {#if hasVotedSurvey(survey.id)}
                        <HasVoted surveyData={surveyData} survey={survey}/>
                    {:else}
                        <HasNotVoted surveyData={surveyData} survey={survey} />
                    {/if}
                    
                {/each}
            {/if}
    {/if}

    
</div>