<script>
    import Modalnote from "../components/Modalnote.svelte";
    import Noteitem from "../components/Noteitem.svelte";
    import {activeNotes} from '../store.js';
</script>


<div>
    <Modalnote buttonSize="lg" descriptionButton="Add Note"/>
</div>
<div class="container">
    {#each $activeNotes as item,i}    
        {#if !item.archive}
                <Noteitem noteItemState="archive" noteInfo={{item:item,index:i}}/> 
        {/if}
    {/each} 
</div>

<style>
    .container{
        display: grid ;
        grid-template-columns: repeat(auto-fill,minmax(300px,1fr));
        grid-auto-rows: minmax(100px,auto);
        grid-gap: 20px ;
        padding: 20px ;
    }
    div{
        text-align: center;
        margin-top: 40px;
    }
</style>
