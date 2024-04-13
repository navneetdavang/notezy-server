import { InferSchemaType, model, Schema } from 'mongoose';

import { Collections } from '../utils/contants';

const noteSchema = new Schema(
	{
		title: { type: String, required: true },
		content: { type: String },
	},
	{ timestamps: true },
);

type Note = InferSchemaType<typeof noteSchema>;

export default model<Note>(Collections.NOTES, noteSchema);
