import 'dotenv/config';

import app from './app';
import { Database } from './core/database';
import { Env } from './utils/validateEnv';

const { PORT } = Env;

const bootstrap = async () => {
	try {
		await Database.connect();
		app.listen(PORT, () => {
			console.info(`notezy-server is listening on PORT:${PORT}`);
		});
	} catch (error) {
		const { stack, message } = error as Error;
		console.error(`StackTrace: ${stack}`);
		console.debug(`Error while bootstrapping the server: ${message}`);
	}
};

bootstrap();
