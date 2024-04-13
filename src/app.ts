import express, { NextFunction, Request, Response } from 'express';

import NoteModel from './models/note';
import { ResponseMessage } from './utils/contants';

const app = express();

app.get('/', async (_, res, next: NextFunction) => {
	try {
		const notes = await NoteModel.find().exec();
		res.status(200).json({
			notes,
		});
	} catch (error) {
		res.status(500);
		next(error);
	}
});

app.all('*', (_: Request, res: Response) =>
	res.status(404).json({
		message: ResponseMessage.INVALID_ENDPOINT,
	}),
);

// Middlerware to handle errors
app.use((error: unknown, _: Request, res: Response) => {
	if (error instanceof Error) console.error(error.message);

	res.json({
		message: ResponseMessage.INTERNAL_SERVER_ERROR,
	});
});

export default app;
