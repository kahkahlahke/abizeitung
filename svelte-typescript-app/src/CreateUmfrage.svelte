<script lang="ts">
    import { genericPost, getMe } from "./queries";

    let title;
    let option;
    let isSuperuser;
    let options = Array<string>();

    getMe().then(data => {
        isSuperuser = data.superuser;
    })

    const addOption = () => {
        options = [...options, option];
        option = "";
    }

    const handleSubmit = async () => {
        await genericPost("/api/make-survey", {title: title, options: options})
        window.location.href = "/umfragen"
    }
</script>

<div class="container">
    {#if isSuperuser}
        <form on:submit|preventDefault={handleSubmit} enctype="multipart/form-data">
            <div class="row">
                <label for="title">Titel der Umfrage:</label>
                <input class="u-full-width" type="text" name="title" id="title" bind:value={title}>
            </div>
            <div class="row">
                <label for="option">Option:</label>
                <input class="u-full-width" type="text" name="option" id="option" bind:value={option}>

            </div>
            <input type="button" class="button" on:click={addOption} value="Diese Option hinzufügen">
            <div class="row">
                {#if options.length > 0}
                    Optionen: 
                    <ul>
                        {#each options as opt}
                            <li>{opt}</li>
                        {/each}
                    </ul>                   
                {/if}

            </div>
            
            <input type="submit" value="Submit" class="button-primary">

        </form>
    {:else}
        <p>Du solltest nicht hier sein...?</p>
    {/if}
</div>