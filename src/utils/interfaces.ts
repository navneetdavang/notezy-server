import { ParamsDictionary } from 'express-serve-static-core';

export interface Note {
	title: string;
	content?: string | null;
}

export interface NoteItem extends Note {
	id: string;
	createdAt: string | NativeDate;
	updatedAt: string | NativeDate;
}

export interface NoteRequestParams extends ParamsDictionary {
	noteId: string;
}

export interface UpdateNoteByIdRequestParams extends NoteRequestParams {}

export interface DeleteNoteByIdRequestParams extends NoteRequestParams {}

export interface GetNoteByIdRequestParams extends NoteRequestParams {}

export interface CreateNoteRequestBody extends NoteItem {}

export interface CreateNoteResult {
	id: string;
}

export interface CreateNoteResponse extends CreateNoteResult {}

export interface UpdateNoteByIdRequestBody extends Partial<NoteItem> {}

export interface GetNotesRequestQuery {
	nextPage?: string;
}

export interface GetNotesResponse {
	notes: NoteItem[];
	nextPage?: string;
}
