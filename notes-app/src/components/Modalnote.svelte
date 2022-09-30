<script>
    import { Button, Modal, ModalBody, ModalFooter} from 'sveltestrap';
    import {activeNotes,saveNoteDb,updateNoteDb} from '../store.js';
    export let value;

    let  color = 'dark'

    export let buttonSize;
    export let descriptionButton;
    
    export let edit = false;
    export let userInputTitle,userInputDescription,userInputCategory,key;
    export let archiveState = false;

    export let categories = []
    $: categories;



    let open = false;
	const toggle = () => {
		open = !open;
    }
    let operationSelector = () => {
            if(edit){
                updateNote();
            }else{
                saveNote();
            }
    };
    let clearfields = () => {toggle(); userInputTitle=""; userInputDescription=""; userInputCategory="";categories = [];}
    let addCategory = () =>{
        if(!categories.includes(userInputCategory)){
            categories = [...categories,userInputCategory];
            userInputCategory = "";
        }
    }

    let removeCategory = (cat) => {categories = categories.filter(c => c!==cat)}

    let saveNote = async() => {
        let note = {title:userInputTitle,description:userInputDescription,archive:false,categories:categories};
        let id = saveNoteDb(note);
        note.id = await id;
        clearfields();

        activeNotes.set([...$activeNotes,note]);
    };
    let updateNote = () => {
                            $activeNotes[value] ={title:userInputTitle,description:userInputDescription,archive:archiveState,categories:categories,id:key};
                            updateNoteDb(key,{title:userInputTitle,description:userInputDescription,archive:archiveState,categories:categories.toString(),id:key})
                            userInputCategory="";
                            toggle();}
</script>
<svelte:head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css">
</svelte:head>

<Button size={buttonSize} target="_self" on:click={() =>toggle()}>
    {descriptionButton}
</Button>
<Modal header="Add/Edit Note" isOpen={open} toggle={toggle}>
    <ModalBody>
        <h3>Title</h3>
        <input type="text"  bind:value={userInputTitle}>
        <h3>Description</h3>
        <textarea type="text-area" bind:value={userInputDescription}></textarea>
        <h3>Categories</h3>
        <div>  
            <ul>
                
                {#each categories as cat} 
                <li>
                    <div class="flex-box"> 
                        <p>{cat}</p>
                        <Button class="bg-danger"size="sm" on:click={()=>{removeCategory(cat)}}> x </Button>
                    </div>
                </li><br>
                {/each}
            </ul>
        </div>
        <input type="text" bind:value={userInputCategory}>
        <Button outline {color} on:click={addCategory}>add</Button>
    </ModalBody>
    <ModalFooter>
        <Button class="btn bg-success btn-primary" on:click={operationSelector}>Save</Button>
        <Button class="bg-dark text-light"on:click={clearfields}>Cancel</Button>
    </ModalFooter>
</Modal>

<style>
    .flex-box { 
        display:flex; 
        justify-content:space-between; 
    }
    p{
        font-size: 20px;
    }
</style>
