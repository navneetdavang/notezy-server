export const encodeToken = (data?: string) =>
	data && Buffer.from(data).toString('base64');

export const decodeToken = (encodedData?: string) =>
	encodedData && Buffer.from(encodedData, 'base64').toString('utf-8');
