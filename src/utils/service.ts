import { logger } from './logger';

export const serviceWrapper = <T, V>(args: {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	handler: (args: T) => V | Promise<V>;
	name: string;
}) => {
	const { handler, name } = args;
	return async (args: T) => {
		try {
			logger.debug(`Executing ${name} service`);
			return await handler(args);
		} catch (error) {
			logger.error(`${name} service, Error: ${error as Error}`);

			throw new Error(
				`Error in ${name} service, Error: ${(error as Error).message}`,
			);
		}
	};
};
