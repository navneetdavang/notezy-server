import cors from 'cors';
import express, { Request, Response } from 'express';
import helmet from 'helmet';

import errorsMiddleware from './middlewares/errors.middleware';
import morganMiddleware from './middlewares/morgan.middleware';
import notesRouter from './routes/notes.route';
import {
	AppEnvirnoment,
	Endpoints,
	ResponseMessage,
} from './utils/contants';
import { logger } from './utils/logger';
import { Env } from './utils/validateEnv';

const { APP_ENV } = Env;

const app = express();

// Configuring the Cors & Helmet
app.use(
	helmet({
		xPoweredBy: false,
	}),
);
app.use(
	cors({
		origin:
			APP_ENV === AppEnvirnoment.DEVELOPMENT
				? [/^http:\/\/localhost:\d+$/]
				: '*',
		credentials: true,
		optionsSuccessStatus: 200,
		preflightContinue: true,
	}),
);

// Configuring logger middleware
app.use(morganMiddleware);

// Configuring express middleware
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
app.use(errorsMiddleware);

export default app;
