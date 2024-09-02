"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { fetchApi } from "../helper/fetchApi";
import { ProjectsReponse } from "../helper/projects.dto";

export default function Projects() {
	const { data: session, status } = useSession();
	const [projects, setProjects] = useState<ProjectsReponse>(
		{} as ProjectsReponse
	);
	const [loading, setLoading] = useState(true);

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

	return (
		<main className="flex justify-center items-center h-screen">
			<div className="bg-white shadow-md rounded p-6 max-w-md w-full">
				<h1 className="text-2xl font-bold mb-4">Projects</h1>
				{projects.data?.length === 0 ? (
					<div>No Projects</div>
				) : (
					<ul>
						{projects.data?.map((project) => (
							<li key={project.id} className="mb-2">
								<div className="p-4 bg-gray-100 rounded">
									<h2 className="text-xl font-semibold">{project.name}</h2>
									<p>{project.description}</p>
								</div>
							</li>
						))}
					</ul>
				)}
			</div>
		</main>
	);
}
