<script>
    let files;
    let dataFile = null;


    function upload() {
        const formData = new FormData();
        formData.append('dataFile', files[0]);
        const upload = fetch('/file-upload', {
            method: 'POST',
            body: formData
        }).then((response) => response.json()).then((result) => {
            console.log('Success:', result);
        })
                .catch((error) => {
                    console.error('Error:', error);
                });
    }
</script>

<input id="fileUpload" type="file" bind:files>

{#if dataFile && files[0]}
    <p>
        {files[0].name}
    </p>
{/if}
