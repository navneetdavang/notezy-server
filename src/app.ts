import express, { NextFunction, Request, Response } from 'express';

import morganMiddleware from './middlewares/morgan.middleware';
import notesRouter from './routes/notes.route';
import { Endpoints, ResponseMessage } from './utils/contants';
import { logger } from './utils/logger';

const app = express();

app.use(morganMiddleware);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(Endpoints.NOTES, notesRouter);

app.all('*', (_: Request, res: Response) => {
	logger.debug(
		`${ResponseMessage.INVALID_ENDPOINT} => ${_.method} ${_.url}`,
	);
	return res.status(404).json({
		message: ResponseMessage.INVALID_ENDPOINT,
	});
});

// Middlerware to handle errors
app.use(
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	(error: unknown, _: Request, res: Response, next: NextFunction) =>
		res.status(500).json({
			message: ResponseMessage.INTERNAL_SERVER_ERROR,
		}),
);

export default app;
