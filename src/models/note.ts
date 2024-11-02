import { InferSchemaType, model, Schema } from 'mongoose';

import { Collections } from '../utils/contants';

const noteSchema = new Schema(
	{
		title: { type: String, required: true },
		content: { type: String },
	},
	{ timestamps: true },
);

export type Note = InferSchemaType<typeof noteSchema> & { _id: string };

export default model<Note>(Collections.NOTES, noteSchema);
