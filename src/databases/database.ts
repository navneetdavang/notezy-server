import mongoose, { Mongoose } from 'mongoose';

import { Env } from '../utils/validateEnv';

import { MongoConfig } from '../config/mongo.config';

const {
	MONGO_CLIENT_USERNAME,
	MONGO_CLIENT_PASSWORD,
	MONGO_CLUSTER_NAME,
	MONGO_DATABASE_NAME,
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
				maxPoolSize: MongoConfig.POOL_SIZE,
				connectTimeoutMS: MongoConfig.CONNECTION_TIMEOUT_MS,
				socketTimeoutMS: MongoConfig.SOCKET_TIMEOUT_MS,
			},
		);
		console.info('MongoDB: Connected');
		return new Database(client);
	}

	getClient(): Mongoose {
		return this.client;
	}
}
