import { z, ZodIssueCode } from 'zod';

export const createNoteSchema = z.object({
	title: z
		.string({
			required_error: "Missing required field 'title'.",
		})
		.min(1, { message: "'title' should not be empty string." })
		.max(500),
	content: z.string().max(500).optional(),
});

export const updateNoteSchema = z
	.object({
		title: z.string().optional(),
		content: z.string().max(500).optional(),
	})
	.partial()
	.superRefine((data, ctx) => {
		const { title } = data;

		if (!Object.keys(data).length)
			ctx.addIssue({
				message: 'Request body cannot be empty',
				code: 'custom',
			});
		else if (title?.trim().length === 0)
			ctx.addIssue({
				path: ['title'],
				message: "'title' should not be empty string.",
				code: ZodIssueCode.custom,
			});
	});
