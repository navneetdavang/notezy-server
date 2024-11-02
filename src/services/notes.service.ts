import NoteModel, { Note } from '../models/note';
import { CreateNoteResult, NoteItem } from '../utils/interfaces';
import { serviceWrapper } from '../utils/service';

export const addNote = serviceWrapper<
	{ note: NoteItem },
	CreateNoteResult
>({
	handler: async (args: {
		note: NoteItem;
	}): Promise<CreateNoteResult> => {
		const { note } = args;

		const { id } = await NoteModel.create(note);
		return {
			id,
		};
	},
	name: 'addNote',
});

export const fetchNotes = serviceWrapper<unknown, Note[]>({
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	handler: async (args): Promise<Note[]> => {
		return await NoteModel.find({});
	},
	name: 'fetchNotes',
});

export const fetchNote = serviceWrapper<{ noteId: string }, Note | null>({
	handler: async (args: { noteId: string }): Promise<Note | null> => {
		const { noteId } = args;
		return await NoteModel.findById(noteId);
	},
	name: 'fetchNote',
});

export const updateNote = serviceWrapper<
	{ noteId: string; note: Partial<NoteItem> },
	Note | null
>({
	handler: async (args: {
		noteId: string;
		note: Partial<NoteItem>;
	}): Promise<Note | null> => {
		const { noteId, note } = args;
		return await NoteModel.findByIdAndUpdate(noteId, note, {
			new: true,
		});
	},
	name: 'updateNote',
});

export const removeNote = serviceWrapper<{ noteId: string }, Note | null>({
	handler: async (args: { noteId: string }): Promise<Note | null> => {
		const { noteId } = args;
		return await NoteModel.findByIdAndDelete(noteId);
	},
	name: 'removeNote',
});
