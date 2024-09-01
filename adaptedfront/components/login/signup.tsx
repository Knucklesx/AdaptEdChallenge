import { FormState, signupScheme } from "../helper/sigupScheme";

export async function signup(state: FormState, formData: FormData) {
	// Validate form fields
	const validatedFields = signupScheme.safeParse({
		name: formData.get("name"),
		password: formData.get("password"),
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
		};
	}

	console.log("áaaa", validatedFields);
}
