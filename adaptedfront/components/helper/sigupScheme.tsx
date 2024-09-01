import { z } from "zod";

export const signupScheme = z.object({
	username: z
		.string()
		.min(3, { message: "Username precisa ter ao menos 3 caracteres" })
		.trim(),
	password: z
		.string()
		.min(6, { message: "Senha precisa ter ao menos 6 caracteres" })
		.trim(),
});

export type FormState =
	| {
			errors?: {
				name?: string[];
				password?: string[];
			};
			message?: string;
	  }
	| undefined;
