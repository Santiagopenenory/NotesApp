<script>
  import {Route,Router} from 'svelte-routing';
  import archivednotes from './pages/archivednotes.svelte';
  import allnotes from './pages/allnotes.svelte';
  import Navbar from './components/Navbar.svelte'
  import { activeNotes } from './store';
  import { Button } from 'sveltestrap';
  import {get} from 'svelte/store'
  let notes = [];
  let textSearch = "";
  let searchCategory = () => {
      notes = get(activeNotes);
      activeNotes.update(
          activeNotes => {
          let ret = [];
          for (let index = 0; index < activeNotes.length; index++) {
              if(activeNotes[index].categories.includes(textSearch)){
                  ret.push(activeNotes[index]);
              }
          }
          return ret;
          });
  };
  let oldNote= (note)=>{
      for (let index = 0; index < $activeNotes.length; index++) {
        if(note.id  === $activeNotes[index].id){
          return false;
        } 
      }
      if(!note.categories.includes(textSearch)){
        return true;
      }
      return false;
  }
  let restoreCategory = () => {   
    for (let index = 0; index < notes.length; index++) {
      if (oldNote(notes[index])){
        activeNotes.set([...$activeNotes,notes[index]]);
      }
    }
    textSearch = "";       
    
  }
  export  let url;
</script>


<svelte:head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css">
</svelte:head>


<main>
  <Router url="{url}">
    <Navbar/>
    <div class="input-container">
      <input  bind:value={textSearch} type="text"  class="input" placeholder="Search Categories"/>
      <Button outline class="bg-dark"on:click={searchCategory}>Find</Button>
      <Button outline class="bg-danger"on:click={restoreCategory}>Go back</Button>
    </div>
      <div>
        <Route path="/" component="{allnotes}"></Route>
        <Route path="/archived-notes" component="{archivednotes}"/>
      </div>
    </Router>
  </main>

<style>

    .input-container{
        text-align: center;
        margin-top: 60px;
    }
    input{
        width: 60%;
        height: 35px;
    }
</style>
