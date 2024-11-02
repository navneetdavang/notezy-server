import { ParamsDictionary } from 'express-serve-static-core';

export interface NoteItem {
	title: string;
	content?: string;
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
