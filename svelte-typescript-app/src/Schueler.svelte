<script lang="ts">
    import { Link } from "svelte-routing";
    import { Kurs } from "./kurs";
    export let studentData;
    export let index;

    
    
</script>
    <tr>
        <td>
            <img src={"/images/" + studentData.image} alt={studentData.name} width="300">
        </td>
        <td>
            
            <h4><strong>Name: </strong><Link to={"/student/" + index}>{studentData.name}</Link></h4>
            <p><strong>Über mich: </strong>{studentData.description}</p>
            <p><strong>Kurs: </strong>{Kurs[studentData.kurs]}</p>

        </td>
    </tr>

<style>
h4{
    font-size: 2em;
}
</style>