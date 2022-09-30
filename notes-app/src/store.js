import {writable} from 'svelte/store';
import axios from 'axios';

export let saveNoteDb = async(note)=>{
    const bd = {
            title:note.title,
            description:note.description,
            categories:note.categories.toString(),
            archive:note.archive
        }
    const res = await axios.post(`${import.meta.env.VITE_API_SERVER}/add-note`,bd);
    
    return res.id;
    
}



export let removeNoteDb = async(id)=>{
    const res = await axios.delete(`${import.meta.env.VITE_API_SERVER}/remove-note/${id}`)
}
export let updateNoteDb = async(id,note)=>{
    const res = await axios.put(`${import.meta.env.VITE_API_SERVER}/update-note/${id}`,note)
}

export let loadNotes = async()=>{
    let notes = await axios.get(`${import.meta.env.VITE_API_SERVER}/all-notes`);
    activeNotes.set(notes.data);
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
