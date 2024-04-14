import { RequestHandler } from 'express';

import NoteModel, { Note } from '../models/note';
import { isValidObjectId } from 'mongoose';

export const getNotes: RequestHandler = async (_, res, next) => {
	try {
		const notes = await NoteModel.find();
		return res.status(200).json({
			notes,
		});
	} catch (error) {
		next(error);
	}
};

export const createNote: RequestHandler = async (req, res, next) => {
	try {
		const note: Note = req.body;
		const response = await NoteModel.create(note);
		return res.status(201).json({
			id: response.id,
		});
	} catch (error) {
		next(error);
	}
};

export const getNoteById: RequestHandler = async (req, res, next) => {
	try {
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
		next(error);
	}
};

export const deleteNoteById: RequestHandler = async (req, res, next) => {
	try {
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
		next(error);
	}
};
