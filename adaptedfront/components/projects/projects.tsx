"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MyButton } from "../button/button";
import { fetchApi } from "../helper/fetchApi";
import { ProjectsReponse } from "../helper/projects.dto";

export default function Projects() {
	const { data: session, status } = useSession();
	const [projects, setProjects] = useState<ProjectsReponse>(
		{} as ProjectsReponse
	);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		async function loadProjects() {
			if (status === "authenticated") {
				try {
					const tasks: ProjectsReponse = await fetchApi(session, "projects");

					setProjects(tasks);
				} catch (err) {
					console.error(err);
				} finally {
					setLoading(false);
				}
			}
		}
		loadProjects();
	}, [session, status]);

	if (loading) {
		return <div>Loading...</div>;
	}
	const handleAddProject = () => {
		router.push("/projects/new");
	};

	const handleDeleteProject = async (id: number) => {
		try {
			await axios.delete(`http://localhost:3001/projects/${id}`, {
				headers: {
					Authorization: `Bearer ${session?.access_token}`,
				},
			});
			setProjects((prevProjects) => ({
				...prevProjects,
				data: prevProjects.data?.filter((project) => project.id !== id),
			}));
			router.push("/projects");
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<main className="flex justify-center items-center min-h-screen bg-slate-300">
			<div className="bg-white shadow-md rounded p-6 w-4/5 my-10">
				<div className="flex justify-between items-center mb-4">
					<h1 className="text-2xl font-bold">Projetos</h1>
					<MyButton
						text="Adicionar Projeto"
						onClick={() => handleAddProject()}
						className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
					/>
				</div>
				{projects.data?.length === 0 ? (
					<div>No Projects</div>
				) : (
					<ul>
						{projects.data?.map((project) => (
							<li key={project.id} className="mb-2">
								<div className="flex justify-between items-center p-4 bg-gray-100 rounded hover:bg-gray-200">
									<Link
										href={`/projects/${project.id}/tasks`}
										className="flex-1"
									>
										<div>
											<h2 className="text-xl font-semibold">{project.name}</h2>
											<p>{project.description}</p>
										</div>
									</Link>
									<div className="flex space-x-2">
										<MyButton
											text="Editar"
											onClick={() =>
												router.push(`/projects/${project.id}/edit`)
											}
											className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
										/>
										<MyButton
											text="Deletar"
											onClick={() => handleDeleteProject(project.id)}
											className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
										/>
									</div>
								</div>
							</li>
						))}
					</ul>
				)}
			</div>
		</main>
	);
}
