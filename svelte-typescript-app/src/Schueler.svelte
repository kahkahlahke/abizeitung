<script lang="ts">
    import { Link } from "svelte-routing";
    export let studentData;

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

    
</script>
    <tr>
        <td>
            <img src={"http://localhost:3232/" + studentData.image} alt={studentData.name} width="300">
        </td>
        <td>
            
            <h4><strong>Name: </strong><Link to={"/student/" + studentData._id}>{studentData.name}</Link></h4>
            <p><strong>Über mich: </strong>{studentData.description}</p>
            <p><strong>Kurs: </strong>{Kurs[studentData.kurs]}</p>

        </td>
    </tr>

<style>
h4{
    font-size: 2em;
}
</style>