"use client";

import axios from "axios";
import { useForm } from "react-hook-form";

export default function LoginForm() {
	const { register, handleSubmit } = useForm({
		defaultValues: {
			username: "",
			password: "",
		},
	});
	const onSubmit = async (data: any) => {
		try {
			const res = await axios.post("http://localhost:3001/auth", data);
			console.log("res", res.data);
		} catch (error: any) {
			if ((error as any).response && (error as any).response.status === 401) {
				console.error("Unauthorized: Invalid username or password");
			} else {
				console.error("An error occurred:", error.message);
			}
		}
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div>
				<label htmlFor="username">Username</label>
				<input type="text" {...register("username")} />
			</div>
			<div>
				<label htmlFor="password">Senha</label>
				<input type="password" {...register("password")} />
			</div>
			<button type="submit">Entrar</button>
		</form>
	);
}
