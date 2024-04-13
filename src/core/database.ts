import mongoose, { Mongoose } from 'mongoose';

import { Env } from '../utils/validateEnv';

const {
	MONGO_CLIENT_USERNAME,
	MONGO_CLIENT_PASSWORD,
	MONGO_CLUSTER_NAME,
	MONGO_DATABASE_NAME,
	MONGO_CLIENT_CONNECTION_TIMEOUT_IN_MIN,
	MONGO_CLIENT_SOCKET_TIMEOUT_IN_HOURS,
	MONGO_CLIENT_POOL_SIZE,
} = Env;

export class Database {
	private client: Mongoose;

	constructor(client: Mongoose) {
		this.client = client;
	}
	static async connect() {
		const client = await mongoose.connect(
			`mongodb+srv://${MONGO_CLIENT_USERNAME}:${MONGO_CLIENT_PASSWORD}@${MONGO_CLUSTER_NAME}.mongodb.net/${MONGO_DATABASE_NAME}?retryWrites=true&w=majority`,
			{
				maxPoolSize: MONGO_CLIENT_POOL_SIZE,
				connectTimeoutMS:
					MONGO_CLIENT_CONNECTION_TIMEOUT_IN_MIN * 60 * 1000,
				socketTimeoutMS:
					MONGO_CLIENT_SOCKET_TIMEOUT_IN_HOURS * 60 * 60 * 1000,
			},
		);
		console.info('MongoDB: Connected');
		return new Database(client);
	}

	getClient(): Mongoose {
		return this.client;
	}
}
