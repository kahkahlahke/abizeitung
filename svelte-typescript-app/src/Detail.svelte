<script lang="ts">
import Kommentar from "./Kommentar.svelte";
import { getAllStudents } from "./queries";

    export let index;
    let id;
    let desc;
    let studentData;
    let commentData;
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

    const getComments = async () => {
        // alert(id)
        const rawResponse = await fetch("/api/get-comments",{ 
      
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

    getAllStudents().then(data => {
        id = data[index-1]._id
        studentData = data
        getComments().then(why => {
            commentData = why;

        })
    })

    const getLogin = async () => {
        const rawResponse = await fetch("/api/me-query", {credentials: "include"});
		const data = await rawResponse.json()
		return data;
    }



    const loginPromise = getLogin();

    async function handleSubmit(){
        const formData = new FormData()
        formData.append("desc", desc)
        formData.append("receiverId", id)
        const options = {
            method: 'POST',
            body: formData,
            credentials: "include"
        }
        await fetch("/api/write-comment", options)
        desc = "";
        getComments().then(why => {
            commentData = why;
        })
    }



</script>

<div class="container">
    {#if studentData === undefined}
        <p>waiting...</p>
        <p>{loginPromise}</p>
    {:else} 
    <h2>{studentData[index-1].name}</h2>
    <div class="row">
    <strong>Über mich: </strong>
    <p>{studentData[index-1].description}</p>
</div>
<div class="row">
    <div class="six columns">
    <img width="400px" src={"/images/" + studentData[index-1].image} alt={studentData[index-1].name}>   
</div> 
    <div class="six columns">
    <strong>Kurs: </strong>
    <p>{Kurs[studentData[index-1].kurs]}</p></div>
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
    {#if id !== undefined}
            {#if commentData === undefined}
            <p>no comments here yet?</p>
            {:else}
            <table  class="u-full-width">
                <tbody>
                {#each commentData as dat, i}
                    <Kommentar data={dat} studentData={studentData} index={i}/>
                {/each}
            </tbody>

        </table>
            {/if}
 
    {/if}
    {/if}
    

</div>
<style>
h2{
    text-align: center;
    color: #ff3e00;
    text-transform: uppercase;
    font-weight: 50;
}

</style>