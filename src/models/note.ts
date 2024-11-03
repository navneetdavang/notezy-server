import { InferSchemaType, model, Schema } from 'mongoose';

import { Collections } from '../utils/contants';

const noteSchema = new Schema(
	{
		title: { type: String, required: true },
		content: { type: String },
	},
	{ timestamps: true },
);

noteSchema.set('toJSON', {
	virtuals: true,
	transform: (_, document) => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { __v, _id, ...doc } = document;
		doc.id = _id;
		return doc;
	},
});

export type Note = InferSchemaType<typeof noteSchema> & { id: string };

export default model<Note>(Collections.NOTES, noteSchema);
