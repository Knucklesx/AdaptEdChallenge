"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { fetchApi } from "../helper/fetchApi";
import { ProjectsReponse } from "../helper/projects.dto";

export default function TaskPage({ id }: { id: number }) {
	const { data: session, status } = useSession();
	const [projects, setProjects] = useState<ProjectsReponse>(
		{} as ProjectsReponse
	);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function loadProjects() {
			if (status === "authenticated") {
				try {
					const tasks: ProjectsReponse = await fetchApi(
						session,
						`projects/${id}/tasks`
					);
					console.log("tasks", typeof tasks);
					setProjects(tasks);
				} catch (err) {
					console.error(err);
				} finally {
					setLoading(false);
				}
			}
		}

		loadProjects();
	}, [session, status, id]);
	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<main className="flex justify-center items-center h-screen">
			<div className="bg-white shadow-md rounded p-6 max-w-md w-full">
				<h1 className="text-2xl font-bold mb-4">Projects</h1>
				{projects.data?.length === 0 ? (
					<h1>OI</h1>
				) : (
					<ul>
						{Object.values(projects).map((p) => (
							<li key={p.id} className="mb-2">
								<div className="p-4 bg-gray-100 rounded">
									<h2 className="text-xl font-semibold">{p.name}</h2>
									<p>{p.description}</p>
									<div>
										{p.tasks.map((t: any) => (
											<div key={t.id} className="p-4 bg-gray-200 rounded">
												<h2 className="text-xl font-semibold">{t.title}</h2>
												<p>{t.description}</p>
											</div>
										))}
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
