import {Request,Response} from 'express';
import {Note} from '../entity/Note';


module.exports.getAllNotes = async(req:Request,res:Response)=>{
    try{
        const notes = await Note.find();
        res.json(notes)
    }catch(err){
        return res.status(500).json({message: 'error' + err});
    }
}

module.exports.addNote = async(req:Request,res:Response)=>{
    try{
        const {title,description,categories,archive} = req.body
        const note = new Note();
        note.title = title
        note.description = description;
        note.categories = categories;
        note.archive = archive;
        await note.save();
        return res.json(note);
    }catch(err){
        return res.status(500).json({message: 'error' + err});
    }

    
    
}

module.exports.deleteNote = async(req:Request,res:Response)=>{ 
    try{
        const {id} = req.params;
        const result = await Note.delete(parseInt(id));
        if (result.affected === 0){
            return res.status(404).json({message:'Note not found'});
        }
        return res.sendStatus(204);
    }catch(err){
        return res.status(500).json({message: 'error' + err});
    }

}


module.exports.updateNote = async(req:Request,res:Response)=>{
    try{
        const {id} = req.params;
        const note = await Note.findBy({id:parseInt(req.params.id)});
        if(!note)return res.status(404).json({message: 'Note does not exists'});
        await Note.update(id,req.body);
        res.sendStatus(204);
    }catch(err){
        return res.status(500).json({message: 'error' + err});
    } 
}