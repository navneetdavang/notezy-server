import { Router } from 'express';

import {
	createNote,
	deleteNoteById,
	getNoteById,
	getNotes,
	updateNoteById,
} from '../controllers/notes.controller';

const router = Router({
	caseSensitive: true,
});

router.get('/', getNotes);
router.post('/', createNote);
router.get('/:noteId', getNoteById);
router.delete('/:noteId', deleteNoteById);
router.patch('/:noteId', updateNoteById);

export default router;
