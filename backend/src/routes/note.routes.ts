import { Router } from "express";

const noteController = require('../controllers/note.controllers')
const router = Router();

//Routes
router.get('/all-notes',noteController.getAllNotes);

router.post('/add-note',noteController.addNote);

router.put('/update-note/:id',noteController.updateNote);

router.delete('/remove-note/:id',noteController.deleteNote);





export default router;