import express from 'express';
import 'dotenv/config';

const { PORT } = process.env;

const app = express();

app.get('/', (_, res) =>
	res.status(200).send('Hello, World from notezy-server:)'),
);

app.listen(Number(PORT), () => {
	console.info(`notezy-server is listening on PORT:${PORT}`);
});
