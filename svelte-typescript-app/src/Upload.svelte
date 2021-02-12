<script lang="ts">
import { Kurs } from "./kurs";



    let kurse = [];

    let name: string;
    let bild;
    let kurs;
    let desc: string;
    let files;
    let password: string;
    let passwordConfirm: string;
    let errorMessage: string;

    for(let i = 0; i < 8; i++){
        kurse.push(Kurs[i])
    }


    function validateForm(): string {
        if(!password){
            return "Du brauchst ein Passwort."
        }
        if(passwordConfirm !== password){
            return "Deine Passwörter stimmen nicht überein."
        }
        if (!name){
            return "Dein Name kann nicht leer sein."
        }
        if (!desc){
            return "Deine Beschreibung kann nicht leer sein."
        }
        if (desc.length > 1113){
            return "Deine Beschreibung ist zu lang."
        }
        if(!files){
            return "Du musst ein Bild von dir hochladen."
        }
        if (files[0].size > 1073741824){
            return "Deine Datei ist zu groß."
        }
        return null;
    }

    async function handleSubmit(){
        const formData = new FormData()
        const isFormInValid = validateForm()
        if(isFormInValid !== null){
            errorMessage = isFormInValid;
            return;
        }

        formData.append("name", name);
        formData.append("kurs", kurs)
        formData.append("desc", desc)
        formData.append("password", password)
        formData.append("file", files[0]);

        console.log(formData.get("name"))
        console.log(formData.get("kurs"))
        const options = {
            method: 'POST',
            body: formData,
            credentials: "include"
        }

        await fetch("/api/upload", options)

        window.location.href = "/"
    }
    //method="POST" action="http://localhost:3232/upload" 
</script>
<div class="container">
<h2>Registrierung</h2>

<form on:submit|preventDefault={handleSubmit} enctype="multipart/form-data">
    <div class="row">
        <div class="six columns">
        <label for="name">Was ist dein Name?</label>
        <input class="u-full-width" type="text" name="name" id="name" bind:value={name}>
        </div>
        <div class="six columns">
            <label for="kurs">Dein Tutorenkurs:</label>
            <select class="u-full-width" id="kurs" name="kurs" bind:value={kurs}>
            {#each kurse as kurs}
                <option>{kurs}</option>
            {/each}
            </select>
        </div>
    </div>
    <div class="row">
        <label for="bild">Ein Bild von dir:</label>
        <!-- <FileUpload></FileUpload> -->
        <input type="file" accept=".png,.jpg,.jpeg" name="bild" id="bild" bind:files class="u-full-width">

    </div>
    <div class="row">
        <label for="desc">Erzähl was über dich:</label>
        <textarea class="u-full-width" name="desc" id="desc" bind:value={desc} />
    </div>
    <div class="row">
        <div class="six columns">
            <label for="password">Dein Passwort:</label>
            <input class="u-full-width" type="password" name="password" id="password" bind:value={password}>
        </div>
        <div class="six columns">
            <label for="passwordConfirm">Dein Passwort bestätigen:</label>
            <input class="u-full-width" type="password" name="passwordConfirm" id="passwordConfirm" bind:value={passwordConfirm}>
        </div>
            
    </div>        
    <input type="submit" value="Submit" class="button-primary">
    
    <!-- <a onclick={handleSubmit} class="button">Submit</a> -->


</form>
{#if errorMessage}
    
<p class="error-message">! {errorMessage}</p>

{/if}
</div>

<style>
    h2{
        font-family: "Ubuntu";
        text-align: center;
		color: #ff3e00;
		text-transform: uppercase;
		font-weight: 50;
    }
    .container{
    font-family: "Ubuntu";
}
    .error-message{
        color: red;
    }
</style>