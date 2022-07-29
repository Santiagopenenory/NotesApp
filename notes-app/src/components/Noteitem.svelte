<script>
    import Modalnote from "./Modalnote.svelte";
    import {Button, NavItem} from "sveltestrap"
    import Modalremove from "./Modalremove.svelte";
    import {activeNotes,updateNoteDb} from "../store";
    export let noteItemState;
    export let noteInfo;

    let archiveNote = ()=> {if(!$activeNotes[noteInfo.index].archive){
                                $activeNotes[noteInfo.index].archive = true
                            }else{
                                $activeNotes[noteInfo.index].archive = false
                            }
                            updateNoteDb($activeNotes[noteInfo.index].id,JSON.stringify({archive:$activeNotes[noteInfo.index].archive}))
                        }
</script>

<div>
    <h5>{noteInfo.item.title}</h5>
    <Button class="bg-dark"size="sm" on:click={archiveNote}>{noteItemState}</Button>
    <Modalnote buttonSize="sm" descriptionButton="edit" userInputDescription={noteInfo.item.description} 
    userInputTitle={noteInfo.item.title} value={noteInfo.index} categories={noteInfo.item.categories} archiveState={noteInfo.item.archive} key={noteInfo.item.id} edit={true}/>
    <Modalremove buttonSize="sm" descriptionButton="delete" item={noteInfo.index}/>
</div>

<style>
    div{
        margin: auto;
        background-color: rgb(167, 167, 167);
        width: 300px;
        border-radius: 12px;
        padding: 4px;
    }
    h5{
        text-align: center !important;
    }
</style>