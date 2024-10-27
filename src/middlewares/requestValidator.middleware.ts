import { NextFunction, Request, Response } from 'express';
import { z, ZodError, ZodRawShape, ZodTypeAny } from 'zod';

import { ResponseMessage } from '../utils/contants';

export const requestValidator = (
	schema: z.ZodObject<ZodRawShape> | z.ZodEffects<ZodTypeAny>,
) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse(req.body);
			next();
		} catch (error) {
			if (error instanceof ZodError) {
				const errorMessages = error.errors.map(
					({ message }) => message,
				);

				res.status(400).json({
					message: ResponseMessage.INVALID_REQUEST_BODY,
					details: errorMessages.join(' '),
				});
			} else {
				res.status(500).json({
					message: ResponseMessage.INTERNAL_SERVER_ERROR,
				});
			}
		}
	};
};
