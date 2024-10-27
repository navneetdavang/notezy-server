import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { ResponseMessage } from '../utils/contants';

const middleware = (
	error: unknown,
	_: Request,
	res: Response,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	next: NextFunction,
) => {
	return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
		message: ResponseMessage.INTERNAL_SERVER_ERROR,
	});
};

export default middleware;
