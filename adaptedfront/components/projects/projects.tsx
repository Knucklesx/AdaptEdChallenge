"use client";
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

	return (
		<main className="flex justify-center items-center h-screen bg-slate-300">
			<div className="bg-white shadow-md rounded p-6 w-4/5 h-4/5">
				{/* <h1 className="text-2xl font-bold mb-4">Projetos</h1> */}
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
								<Link href={`/projects/${project.id}/tasks`}>
									<p className="block p-4 bg-gray-100 rounded hover:bg-gray-200">
										<h2 className="text-xl font-semibold">{project.name}</h2>
										<p>{project.description}</p>
									</p>
								</Link>
								<MyButton
									text="Editar"
									onClick={() => router.push(`/projects/${project.id}/edit`)}
									className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
								/>
							</li>
						))}
					</ul>
				)}
			</div>
		</main>
	);
}
