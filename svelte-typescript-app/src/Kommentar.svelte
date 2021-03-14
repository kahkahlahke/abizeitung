<script lang="ts">
    export let data;
    export let studentData
    export let index;
</script>
<tr>
    <p class="comment">"{data.content}"</p>
    <p> - {studentData.find(x => x._id === data.author).name}</p>
</tr>

<style>
    .comment{
    font-style: italic;
    font-family: cursive;
}
</style>