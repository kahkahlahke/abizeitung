<script lang="ts">
    import Chart, { ChartConfiguration } from "chart.js";
import { onMount } from "svelte";

    export let surveyData;
    export let survey;
    let hasBeenRendered = false;
    // console.log(survey.id)
    const makePieChartData = () => {
        const surveyId = survey.id;
        let data = {
            labels: [],
            datasets: [{
                backgroundColor: [          
                ],
                data: []
            }]
        }


        for(let i = 0; i < surveyData.optionen.length; i++){
            if(surveyData.optionen[i].umfrage === surveyId){
                data.labels.push(surveyData.optionen[i].title);
                data.datasets[0].backgroundColor.push(`rgb(${Math.round(Math.random()*255)},${Math.round(Math.random()*255)},${Math.round(Math.random()*255)})`)
                data.datasets[0].data.push(surveyData.optionen[i].numberOf);
            }
        }
        // console.log(surveyId)
        const thisChartCanvas = document.getElementById(survey.id) as HTMLCanvasElement;
        // console.log(thisChartCanvas)
        const ctx = thisChartCanvas.getContext("2d");
        const chart = new Chart(ctx, {type: "pie", data: data, options: {}});
        hasBeenRendered = true;
    }
    onMount(() => {
        makePieChartData();
    })
</script>

<div>
    <h3>{survey.title}</h3>
    <canvas id={survey.id}></canvas>
    <!-- <button class="button" on:click={makePieChartData}>Show Results</button> -->
</div>