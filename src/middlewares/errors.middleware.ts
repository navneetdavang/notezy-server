import { NextFunction, Request, Response } from 'express';

import { ResponseMessage } from '../utils/contants';

const middleware = (
	error: unknown,
	_: Request,
	res: Response,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	next: NextFunction,
) => {
	return res.status(500).json({
		message: ResponseMessage.INTERNAL_SERVER_ERROR,
	});
};

export default middleware;
