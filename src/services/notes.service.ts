import { ApiConfig } from '../config/api.config';
import NoteModel from '../models/note';
import { decodeToken, encodeToken } from '../utils/helper';
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

export const fetchNotes = serviceWrapper<
	{ nextPage?: string },
	{ notes: NoteItem[]; nextPage?: string }
>({
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	handler: async (
		args,
	): Promise<{ notes: NoteItem[]; nextPage?: string }> => {
		const { nextPage } = args;

		const pageLimit = ApiConfig.FETCH_NOTES_PAGE_LIMIT || 10;

		console.log({
			nextPage,
		});

		const notes = await NoteModel.find({
			...(nextPage ? { _id: { $lt: decodeToken(nextPage) } } : {}),
		})
			.sort({ createdAt: -1 })
			.limit(pageLimit);

		return {
			notes,
			nextPage:
				notes.length && notes.length === pageLimit
					? encodeToken(notes[notes.length - 1].id)
					: undefined,
		};
	},
	name: 'fetchNotes',
});

export const fetchNote = serviceWrapper<
	{ noteId: string },
	NoteItem | null
>({
	handler: async (args: {
		noteId: string;
	}): Promise<NoteItem | null> => {
		const { noteId } = args;
		const note = await NoteModel.findById(noteId);

		return note;
	},
	name: 'fetchNote',
});

export const updateNote = serviceWrapper<
	{ noteId: string; note: Partial<NoteItem> },
	NoteItem | null
>({
	handler: async (args: {
		noteId: string;
		note: Partial<NoteItem>;
	}): Promise<NoteItem | null> => {
		const { noteId, note } = args;
		return await NoteModel.findByIdAndUpdate(noteId, note, {
			new: true,
		});
	},
	name: 'updateNote',
});

export const removeNote = serviceWrapper<
	{ noteId: string },
	NoteItem | null
>({
	handler: async (args: {
		noteId: string;
	}): Promise<NoteItem | null> => {
		const { noteId } = args;
		return await NoteModel.findByIdAndDelete(noteId);
	},
	name: 'removeNote',
});
