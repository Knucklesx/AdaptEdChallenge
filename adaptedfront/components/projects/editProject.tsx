"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchApi } from "../helper/fetchApi";
import { ProjectsReponse } from "../helper/projects.dto";

export default function EditProject({ id }: { id: number }) {
	const { data: session, status } = useSession();
	const [projects, setProjects] = useState<ProjectsReponse>(
		{} as ProjectsReponse
	);
	const [loading, setLoading] = useState(true);
	const [projName, setProjName] = useState("");
	const [projDescription, setProjDescription] = useState("");

	const router = useRouter();

	useEffect(() => {
		async function loadProjects() {
			if (status === "authenticated") {
				try {
					const project: ProjectsReponse = await fetchApi(
						session,
						`projects/${id}`
					);
					const projectElement = Object.values(project.data);
					setProjects(project);
					const projectName =
						typeof projectElement[1] === "string" ? projectElement[1] : "";
					const projectDescription =
						typeof projectElement[2] === "string" ? projectElement[2] : "";
					setProjName(projectName);
					setProjDescription(projectDescription);
				} catch (err) {
					console.error(err);
				} finally {
					setLoading(false);
				}
			}
		}

		loadProjects();
	}, [session, status, id]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		console.log("handleSubmit called");
		console.log("submit", { projName, projDescription });
		try {
			const res = await axios.put(
				`http://localhost:3001/projects/${id}`,
				{
					name: projName,
					description: projDescription,
				},
				{
					headers: {
						Authorization: `Bearer ${session?.access_token}`,
					},
				}
			);
			console.log("response", res);
			if (res.status === 200) {
				router.push("/projects");
			}
		} catch (error) {
			console.error("error", error);
		}
	};

	return (
		<main className="flex justify-center items-center min-h-screen bg-slate-300">
			<div className="bg-white shadow-md rounded p-6 w-4/5">
				<h1 className="text-2xl font-bold mb-4">Editar Projeto</h1>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label
							htmlFor="name"
							className="block text-sm font-medium text-gray-700"
						>
							Nome
						</label>
						<input
							type="text"
							id="name"
							value={projName}
							onChange={(e) => setProjName(e.target.value)}
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="description"
							className="block text-sm font-medium text-gray-700"
						>
							Descrição
						</label>
						<textarea
							id="description"
							value={projDescription}
							onChange={(e) => setProjDescription(e.target.value)}
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						/>
					</div>

					<button
						type="submit"
						className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
					>
						Enviar
					</button>
				</form>
			</div>
		</main>
	);
}
