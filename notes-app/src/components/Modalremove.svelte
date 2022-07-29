<script>
    import { Button, Modal, ModalBody, ModalFooter} from 'sveltestrap';
    import {activeNotes,removeNoteDb} from '../store.js';

    export let buttonSize;
    export let descriptionButton;
    export let item;
    let open = false;
    const toggle = () => {
      open = !open;
    }
    let removeNote = () => {    
                            removeNoteDb($activeNotes[item].id);
                            activeNotes.update(activeNotes =>{  
                            let ret = [];
                            for (let index = 0; index < activeNotes.length; index++) {
                                if(index !== item){
                                  ret.push(activeNotes[index]);
                                } 
                                
                            }
                              return ret;
                            }
                            )
    }




</script>
<svelte:head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css">
</svelte:head>

<Button  class="bg-danger" size={buttonSize} target="_self" on:click={() => toggle()}>
    {descriptionButton}
</Button>
<Modal header="Add/Edit Note" isOpen={open} toggle={toggle}>
    <ModalBody>
      <h3>Are you sure you want to delete this note?</h3>
    </ModalBody>
    <ModalFooter>
        <Button class="btn bg-danger btn-primary" on:click={removeNote}>Yes</Button>
        <Button class="bg-dark text-light"on:click={toggle}>No</Button>
    </ModalFooter>
</Modal>
