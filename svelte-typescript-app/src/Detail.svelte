<script lang="ts">
    export let id;

    let desc;

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

    const getStudentData = async () => {
        const rawResponse = await fetch("http://localhost:3232/api/get-students");
		const data = await rawResponse.json()
		return data;
    }

    const promise = getStudentData()

    const getComments = async () => {
        const rawResponse = await fetch("http://localhost:3232/api/get-comments",{ 
      
      // Adding method type 
      method: "POST", 
        
      // Adding body or contents to send 
      body: JSON.stringify({ 
            studentId: id
      }), 
        
      // Adding headers to the request 
      headers: { 
          "Content-type": "application/json; charset=UTF-8"
      } 
  } );
		const data = await rawResponse.json()
		return data;
    }

    const getLogin = async () => {
        const rawResponse = await fetch("http://localhost:3232/api/me-query", {credentials: "include"});
		const data = await rawResponse.json()
		return data;
    }

    const commentPromise = getComments();

    const loginPromise = getLogin();

    function handleSubmit(){
        const formData = new FormData()
        formData.append("desc", desc)
        formData.append("receiverId", id)
        const options = {
            method: 'POST',
            body: formData,
            credentials: "include"
        }
        fetch("http://localhost:3232/api/write-comment", options)
    }



</script>

<div class="container">
    {#await promise}
        <p>waiting...</p>
    {:then studentData} 
    <h2>{studentData[id-1].name}</h2>
    <div class="row">
    <strong>Über mich: </strong>
    <p>{studentData[id-1].description}</p>
</div>
<div class="row">
    <div class="six columns">
    <img width="400px" src={"http://localhost:3232/images/" + studentData[id-1].image} alt={studentData[id-1].name}>   
</div> 
    <div class="six columns">
    <strong>Kurs: </strong>
    <p>{Kurs[studentData[id-1].kurs]}</p></div>
     
</div>
    {#await loginPromise}
        <p>waitin</p>
    {:then data} 
    {#if data !== null}
    <form on:submit|preventDefault={handleSubmit} enctype="multipart/form-data">
        <label for="desc">Deine wohlüberlegte Meinung zu diesem Schüler:</label>
        <textarea name="desc" id="desc" bind:value={desc} class="u-full-width"/>
        <input type="submit" value="Submit">
    </form>           
    {/if}
    {/await}

    {#await commentPromise}
        <p>no comments here yet?</p>
    {:then data} 
    <table  class="u-full-width">
        <tbody>
        {#each data as dat}

                <tr>
                <p class="comment">"{dat.content}"</p>
                <p> - {studentData[dat.author-1].name}</p>
            </tr>
        {/each}
    </tbody>

</table>
    {/await}   
    {/await}
    

</div>
<style>
h2{
    font-family: "Ubuntu";
    text-align: center;
    color: #ff3e00;
    text-transform: uppercase;
    font-weight: 50;
}
.comment{
    font-style: italic;
    font-family: cursive;
}

.container{
    font-family: "Ubuntu";
}
</style>