<script lang="ts">
    export let fields;
    export let cred;
    let form_bind = {};
    for(let i = 0; i < fields.length; i++){
        form_bind[fields[i]] = undefined;
    }

    async function handleSubmit(){
        const formData = new FormData();
        for (let i = 0; i < fields.length; i++){
            formData.append(fields[i], form_bind[fields[i]])
        }
        const options = {
            method: 'POST',
            body: formData,
            credentials: cred
        }

        await fetch("/api/upload", options)
    }

</script>

<div>
    
    <form on:submit|preventDefault={handleSubmit} enctype="multipart/form-data">
        <slot></slot>
        <input type="submit" value="Submit" class="button-primary">
    </form>
</div>