<script lang="ts">
    let name;

    function handleSubmit(){
        const formData = new FormData()
        formData.append("name", name);

        const options = {
            method: 'POST',
            body: formData,
            credentials: "include"
        }
        fetch("http://localhost:3232/login", options)
    }
</script>
<div class="container">
    <h2>Login</h2>
<form on:submit|preventDefault={handleSubmit} enctype="multipart/form-data">
    <label for="name">Was ist dein Name?</label>
    <input class="u-full-width" type="text" name="name" id="name" bind:value={name}>
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