export interface NoteRequestParams {
	noteId: string;
}

export interface UpdateNoteByIdRequestParams extends NoteRequestParams {}

export interface DeleteNoteRequestParams extends NoteRequestParams {}

export interface GetNoteByIdRequestParams extends NoteRequestParams {}

export interface NoteRequestBody {
	title?: string;
	content?: string;
}

export interface CreateNoteRequestBody extends NoteRequestBody {}

export interface UpdateNoteByIdRequestBody extends NoteRequestBody {}
