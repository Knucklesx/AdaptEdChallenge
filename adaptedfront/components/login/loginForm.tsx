"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function LoginForm() {
	const [loading, setLoading] = useState(false);
	const { register, handleSubmit, watch } = useForm({
		defaultValues: {
			username: "",
			password: "",
		},
	});
	const router = useRouter();
	const onSubmit = async (data: any) => {
		setLoading(true);

		const res = await signIn("credentials", {
			redirect: false,
			username: data.username,
			password: data.password,
		});
		console.log("res", res);
		setLoading(false);
		if (res?.error) {
			console.log("error", res.error);
			return;
		}
		router.push("/projects");
	};

	const isButtonDisabled = () => {
		const username = watch("username");
		const password = watch("password");
		return loading || !username || !password;
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="relative w-full mb-3">
				<label
					htmlFor="username"
					className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
				>
					Username
				</label>
				<input
					type="text"
					{...register("username")}
					className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
				/>
			</div>
			<div className="relative w-full mb-3">
				<label
					htmlFor="password"
					className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
				>
					Senha
				</label>
				<input
					type="password"
					{...register("password")}
					className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
				/>
			</div>
			<button
				className={`text-white text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150 ${
					isButtonDisabled()
						? "bg-gray-400 cursor-not-allowed"
						: "bg-black active:bg-black"
				}`}
				type="submit"
				disabled={isButtonDisabled()}
			>
				Entrar
			</button>
		</form>
	);
}
