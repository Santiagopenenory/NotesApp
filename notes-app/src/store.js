import {writable} from 'svelte/store';

export let saveNoteDb = async(note)=>{
    const bd = JSON.stringify({
            title:note.title,
            description:note.description,
            categories:note.categories.toString(),
            archive:note.archive
        })
    const res = await fetch(`${import.meta.env.VITE_API_SERVER}/add-note`,{
        mode:'cors',
        method:'POST',
        headers:{
            "Content-type":"application/json"
        },
        body:bd
    })
    return (await res.json()).id;
    
}

export let removeNoteDb = async(id)=>{
    const res = await fetch(`${import.meta.env.VITE_API_SERVER}/remove-note/${id}`,{
        mode:'cors',
        method:'DELETE',
        headers:{
            "Content-type":"application/json"
        }
    })
}
export let updateNoteDb = async(id,note)=>{
    const res = await fetch(`${import.meta.env.VITE_API_SERVER}/update-note/${id}`,{
        mode:'cors',
        method:'PUT',
        headers:{
        "Content-Type":"application/json"
        },
        body:note
    })
}

export let loadNotes = async()=>{
    let notes = await fetch(`${import.meta.env.VITE_API_SERVER}/all-notes`);
    activeNotes.set(await notes.json());
    convertCategory();
}
loadNotes();

let convertCategory = ()=>{
    activeNotes.update(activeNotes =>{  
        for (let index = 0; index < activeNotes.length; index++) {
            if(activeNotes[index].categories !== ""){
                activeNotes[index].categories = activeNotes[index].categories.split(',') 
            } 
        }
        return activeNotes;
        }
        )
}

export var activeNotes = writable([]);
