<script lang="ts">
    let name;
    let password;

    async function handleSubmit(){
        const formData = new FormData()
        formData.append("name", name);
        formData.append("password", password);

        const options = {
            method: 'POST',
            body: formData,
            credentials: "include"
        }
        await fetch("/api/login", options)
        window.location.href = "/"
    }
</script>
<div class="container">
    <h2>Login</h2>
<form on:submit|preventDefault={handleSubmit} enctype="multipart/form-data">
    <div class="row">
        <div class="six columns">
        <label for="name">Dein Name:</label>
        <input class="u-full-width" type="text" name="name" id="name" bind:value={name}>
    </div>
    <div class="six columns">
        <label for="password">Dein Passwort:</label>
        <input class="u-full-width" type="password" name="password" id="password" bind:value={password}>
        
    </div>
    <input type="submit" value="Submit" class="button-primary">
    </div>
</form>
</div>
<style>
    h2{
        text-align: center;
		color: #ff3e00;
		text-transform: uppercase;
		font-weight: 50;
    }
    .container{
}
</style>