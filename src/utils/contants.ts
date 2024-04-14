export enum Collections {
	NOTES = 'Note',
}

export enum ResponseMessage {
	INTERNAL_SERVER_ERROR = 'Internal Server Error',
	INVALID_ENDPOINT = 'Invalid Endpoint',
}

export const BaseEndpoint = '/api';

export const Endpoints = {
	NOTES: `${BaseEndpoint}/notes`,
};
