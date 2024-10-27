import { ParamsDictionary } from 'express-serve-static-core';

export interface NoteRequestParams extends ParamsDictionary {
	noteId: string;
}

export interface UpdateNoteByIdRequestParams extends NoteRequestParams {}

export interface DeleteNoteByIdRequestParams extends NoteRequestParams {}

export interface GetNoteByIdRequestParams extends NoteRequestParams {}

export interface NoteRequestBody {
	title?: string;
	content?: string;
}

export interface CreateNoteRequestBody extends NoteRequestBody {}

export interface CreateNoteResponse {
	id: string;
}

export interface UpdateNoteByIdRequestBody extends NoteRequestBody {}
