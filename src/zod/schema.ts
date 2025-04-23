import { z } from "zod";

export const formSchema = z.object( {
	name: z.string().min(
		2,
		{
			message: "Name must be at least 2 characters.",
		}
	),
	category: z.string( {
		required_error: "Please select a category.",
	} ),
} );
export type FormValues = z.infer<typeof formSchema>;