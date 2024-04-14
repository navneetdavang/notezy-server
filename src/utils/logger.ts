import winston from 'winston';

import {
	AppEnvirnoment,
	loggerLevels as levels,
	LogLevel,
} from './contants';
import { Env } from './validateEnv';

const { APP_ENV } = Env;

// Setting the log level based Application Env
const logLevel = () => {
	switch (APP_ENV) {
		case AppEnvirnoment.DEVELOPMENT:
			return LogLevel.DEBUG;
		case AppEnvirnoment.PRODUCTION:
		case AppEnvirnoment.TEST:
			return LogLevel.WARN;
		default:
			return LogLevel.DEBUG;
	}
};

// Log format customization
const format = winston.format.combine(
	// Add the message timestamp with the preferred format
	winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
	// Tell Winston that the logs must be colored
	winston.format.colorize({ all: true }),
	// Define the format of the message showing the timestamp, the level and the message
	winston.format.printf(
		({ timestamp, level, message }) =>
			`${timestamp} ${level.toUpperCase()}: ${message}`,
	),
);

// Different modes of transports
const transports = [
	// console to print messages
	new winston.transports.Console(),
	// all the error level messages inside the error.log file
	new winston.transports.File({
		filename: 'logs/error.log',
		level: 'error',
	}),
	// print all the logs
	new winston.transports.File({ filename: 'logs/.log' }),
];

export const logger = winston.createLogger({
	level: logLevel(),
	levels,
	format,
	transports,
});
