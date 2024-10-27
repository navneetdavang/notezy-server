import { Router } from 'express';

import {
	createNote,
	deleteNoteById,
	getNoteById,
	getNotes,
	updateNoteById,
} from '../controllers/notes.controller';
import { requestValidator } from '../middlewares/requestValidator.middleware';
import {
	createNoteSchema,
	updateNoteSchema,
} from '../schemas/note.schema';

const router = Router({
	caseSensitive: true,
});

router.get('/', getNotes);
router.post('/', requestValidator(createNoteSchema), createNote);
router.get('/:noteId', getNoteById);
router.delete('/:noteId', deleteNoteById);
router.patch(
	'/:noteId',
	requestValidator(updateNoteSchema),
	updateNoteById,
);

export default router;
