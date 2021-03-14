<script lang="ts">
    import { Kurs } from "./kurs";
    import { genericPost } from "./queries";


    export let dat;

    async function handleClickAdmin(){
        await genericPost("/api/make-superuser", {id: dat._id})
    }
    async function handleClickDelete(){
        await genericPost("/api/delete-student", {id: dat._id})
    }


</script>
        <tr>
            <td><img src={"/images/" + dat.image} alt={dat.name} width="200"></td>
            <td>
                <p><strong>Name: </strong> {dat.name}</p>
                <p><strong>Beschreibung: </strong> {dat.description}</p>
                <p><strong>Kurs: </strong> {Kurs[dat.kurs]}</p>
            </td>
            <td>
                <button class="button" on:click={handleClickAdmin}>Admin machen</button>
                <button class="button" on:click={handleClickDelete}>User löschen</button>
            </td>
        </tr>


<style>

</style>