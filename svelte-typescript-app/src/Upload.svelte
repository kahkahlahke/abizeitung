<script lang="ts">
import FileUpload from "./fileUpload.svelte";

    let kurse = [];

    let name;
    let bild;
    let kurs;
    let desc;
    let files;

    enum Kurs {
        EN1 = 0,
        MA1,
        BIO1,
        DE1,
        PH1,
        CH1,
        LA1,
        GE1
    }

    for(let i = 0; i < 8; i++){
        kurse.push(Kurs[i])
    }

    function handleSubmit(){
        console.log(bild)
        const formData = new FormData()
        formData.append("name", name);
        formData.append("kurs", kurs)
        formData.append("desc", desc)
        formData.append("file", files[0]);

        console.log(formData.get("name"))
        console.log(formData.get("kurs"))
        const options = {
            method: 'POST',
            body: formData,
            credentials: "include"
        }
        fetch("http://localhost:3232/upload", options)
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
    
    <label for="bild">Ein Bild von dir:</label>
    <!-- <FileUpload></FileUpload> -->
    <input type="file" name="bild" id="bild" bind:files class="u-full-width">

    <label for="desc">Erzähl was über dich:</label>
    <textarea class="u-full-width" name="desc" id="desc" bind:value={desc} />
    <input type="submit" value="Submit" class="button-primary">
</form>
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
</style>