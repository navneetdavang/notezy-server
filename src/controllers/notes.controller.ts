import { RequestHandler } from 'express';
import { isValidObjectId } from 'mongoose';

import NoteModel from '../models/note';
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

		const notes = await NoteModel.find();
		return res.status(200).json({
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

		const { title } = note;

		if (!title) {
			return res.status(400).json({
				message: 'Invalid Request: title does not exists',
			});
		}

		const response = await NoteModel.create(note);
		return res.status(201).json({
			id: response.id,
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
			return res.status(400).json({
				message: `Invalid Object Id[${noteId}]`,
			});

		const response = await NoteModel.findById(noteId);

		if (!response)
			return res.status(404).json({
				message: `Note does not exists for Id[${noteId}]`,
			});

		return res.status(200).json(response);
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
			return res
				.status(400)
				.json({ message: `Invalid Object Id[${noteId}]` });

		const response = await NoteModel.findByIdAndDelete(noteId);

		if (!response)
			return res.status(404).json({
				message: `Note does not exists for Id[${noteId}]`,
			});

		return res.sendStatus(204);
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

		const updatedNote = req.body;

		if (!isValidObjectId(noteId))
			return res
				.status(400)
				.json({ message: `Invalid Object Id[${noteId}]` });

		const response = await NoteModel.findByIdAndUpdate(
			noteId,
			updatedNote,
		);

		if (!response)
			return res.status(404).json({
				message: `Note does not exists for Id[${noteId}]`,
			});

		return res.sendStatus(204);
	} catch (error) {
		logger.error(
			`updateNoteById controller, Error: ${(error as Error).message}`,
		);
		next(error);
	}
};
