import express, { NextFunction, Request, Response } from 'express';

import notesRouter from './routes/notes.route';
import { Endpoints, ResponseMessage } from './utils/contants';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(Endpoints.NOTES, notesRouter);

app.all('*', (_: Request, res: Response) =>
	res.status(404).json({
		message: ResponseMessage.INVALID_ENDPOINT,
	}),
);

// Middlerware to handle errors
app.use(
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	(error: unknown, _: Request, res: Response, next: NextFunction) => {
		if (error instanceof Error) console.error(error.message);

		res.status(500).json({
			message: ResponseMessage.INTERNAL_SERVER_ERROR,
		});
	},
);

export default app;
