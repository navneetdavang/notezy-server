import morgan from 'morgan';

import { AppEnvirnoment } from '../utils/contants';
import { logger } from '../utils/logger';
import { Env } from '../utils/validateEnv';

const { APP_ENV } = Env;

const morganOptions = {
	skip: () => APP_ENV !== AppEnvirnoment.DEVELOPMENT,
	stream: {
		write: (msg: string) => logger.http(msg),
	},
} as never;

const middleware = morgan('combined', morganOptions);

export default middleware;
