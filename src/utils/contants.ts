export enum AppEnvirnoment {
	DEVELOPMENT = 'development',
	PRODUCTION = 'production',
	TEST = 'test',
}

export enum LogLevel {
	ERROR = 'error',
	WARN = 'warn',
	INFO = 'info',
	HTTP = 'http',
	DEBUG = 'debug',
}

export enum Collections {
	NOTES = 'Note',
}

export enum ResponseMessage {
	INVALID_REQUEST_BODY = 'Invalid Request Body',
	INTERNAL_SERVER_ERROR = 'Internal Server Error',
	INVALID_ENDPOINT = 'Invalid Endpoint',
}

export const BaseEndpoint = '/api';

export const Endpoints = {
	NOTES: `${BaseEndpoint}/notes`,
};

// Security levels of logging
export const loggerLevels = {
	error: 0,
	warn: 1,
	info: 2,
	http: 3,
	debug: 4,
};

// Logging levels color configurations
export const loggerLevelColors = {
	error: 'red',
	warn: 'yellow',
	info: 'green',
	http: 'magenta',
	debug: 'white',
};
