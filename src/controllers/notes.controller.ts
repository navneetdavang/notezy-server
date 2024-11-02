import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { isValidObjectId } from 'mongoose';

import * as NoteService from '../services/notes.service';
import {
	CreateNoteRequestBody,
	DeleteNoteByIdRequestParams,
	GetNoteByIdRequestParams,
	UpdateNoteByIdRequestBody,
	UpdateNoteByIdRequestParams,
} from '../utils/interfaces';
import { logger } from '../utils/logger';

export const getNotes: RequestHandler = async (_, res, next) => {
	try {
		logger.debug('Executing getNotes controller');

		const notes = await NoteService.fetchNotes({});
		return res.status(StatusCodes.OK).json({
			notes,
		});
	} catch (error) {
		logger.error(
			`getNotes controller, Error: ${(error as Error).message}`,
		);
		next(error);
	}
};

export const createNote: RequestHandler<
	unknown,
	unknown,
	CreateNoteRequestBody
> = async (req, res, next) => {
	try {
		logger.debug('Executing createNote controller');
		const note = req.body;

		const createNoteResult = await NoteService.addNote({ note });

		return res.status(StatusCodes.CREATED).json({
			id: createNoteResult.id,
		});
	} catch (error) {
		logger.error(
			`createNote controller, Error: ${(error as Error).message}`,
		);
		next(error);
	}
};

export const getNoteById: RequestHandler<
	GetNoteByIdRequestParams
> = async (req, res, next) => {
	try {
		logger.debug('Executing getNoteById controller');

		const { noteId } = req.params;

		if (!isValidObjectId(noteId))
			return res.status(StatusCodes.BAD_REQUEST).json({
				message: `Invalid Object Id[${noteId}]`,
			});

		const result = await NoteService.fetchNote({ noteId });

		if (!result)
			return res.status(StatusCodes.NOT_FOUND).json({
				message: `Note does not exists for Id[${noteId}]`,
			});

		return res.status(StatusCodes.OK).json(result);
	} catch (error) {
		logger.error(
			`getNoteById controller, Error: ${(error as Error).message}`,
		);
		next(error);
	}
};

export const deleteNoteById: RequestHandler<
	DeleteNoteByIdRequestParams
> = async (req, res, next) => {
	try {
		logger.debug('Executing deleteNoteById controller');

		const { noteId } = req.params;

		if (!isValidObjectId(noteId))
			return res.status(StatusCodes.BAD_REQUEST).json({
				message: `Invalid Object Id[${noteId}]`,
			});

		const result = await NoteService.removeNote({ noteId });

		if (!result)
			return res.status(StatusCodes.NOT_FOUND).json({
				message: `Note does not exists for Id[${noteId}]`,
			});

		return res.sendStatus(StatusCodes.NO_CONTENT);
	} catch (error) {
		logger.error(
			`deleteNoteById controller, Error: ${(error as Error).message}`,
		);
		next(error);
	}
};

export const updateNoteById: RequestHandler<
	UpdateNoteByIdRequestParams,
	unknown,
	UpdateNoteByIdRequestBody
> = async (req, res, next) => {
	try {
		logger.debug('Executing updateNoteById controller');

		const { noteId } = req.params;

		const note = req.body;

		if (!isValidObjectId(noteId))
			return res.status(StatusCodes.BAD_REQUEST).json({
				message: `Invalid Object Id[${noteId}]`,
			});

		const result = await NoteService.updateNote({ noteId, note });

		if (!result)
			return res.status(StatusCodes.NOT_FOUND).json({
				message: `Note does not exists for Id[${noteId}]`,
			});

		return res.sendStatus(StatusCodes.NO_CONTENT);
	} catch (error) {
		logger.error(
			`updateNoteById controller, Error: ${(error as Error).message}`,
		);
		next(error);
	}
};
