import { cleanEnv, num, str } from 'envalid';

import { AppEnvirnoment } from './contants';

export const Env = cleanEnv(process.env, {
	// Application Env Variables
	PORT: num(),
	APP_ENV: str({ choices: Object.values(AppEnvirnoment) }),

	// Database:Mongo Env Variables
	MONGO_CLIENT_CONNECTION_TIMEOUT_IN_MIN: num(),
	MONGO_CLIENT_SOCKET_TIMEOUT_IN_HOURS: num(),
	MONGO_CLIENT_POOL_SIZE: num(),
	MONGO_CLIENT_USERNAME: str(),
	MONGO_CLIENT_PASSWORD: str(),
	MONGO_CLUSTER_NAME: str(),
	MONGO_DATABASE_NAME: str(),
});
