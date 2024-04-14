import { RequestHandler } from 'express';
import { isValidObjectId } from 'mongoose';

import NoteModel, { Note } from '../models/note';
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

export const createNote: RequestHandler = async (req, res, next) => {
	try {
		logger.debug('Executing createNote controller');
		const note: Note = req.body;
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

export const getNoteById: RequestHandler = async (req, res, next) => {
	try {
		logger.debug('Executing getNoteById controller');

		const { noteId } = req.params;

		if (!isValidObjectId(noteId))
			return res.status(400).json({
				message: `Invalid Object Id[${noteId}]`,
			});

		console.log('Test');

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

export const deleteNoteById: RequestHandler = async (req, res, next) => {
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

		return res.status(200).json();
	} catch (error) {
		logger.error(
			`deleteNoteById controller, Error: ${(error as Error).message}`,
		);
		next(error);
	}
};
