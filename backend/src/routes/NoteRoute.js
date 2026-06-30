import { Router } from "express";
import { addNote, deleteNote, getNotes, updateNote } from "../controllers/NoteController.js";


const router = Router();

router.route('/').get(getNotes)
router.route('/add').post(addNote);
router.route('/update/:id').patch(updateNote)
router.route('/delete/:id').delete(deleteNote)



export default router;