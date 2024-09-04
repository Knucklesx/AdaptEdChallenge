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

	const myProj = Object.values(projects.data);
	console.log("ppp", myProj);
	const myProjName = typeof myProj[1] === "string" ? myProj[1] : "";

	return (
		<main className="flex justify-center items-center min-h-screen bg-slate-300">
			<div className="bg-white shadow-md rounded p-6 w-4/5 h-4/5">
				<h1 className="text-2xl font-bold mb-4">
					Tarefas do Projeto {myProjName}
				</h1>
				{projects.data?.length === 0 ? (
					<h1>No Tasks</h1>
				) : (
					<ul>
						{Object.values(projects).map((p) => (
							<li key={p.id} className="mb-2">
								<div className="p-4 bg-gray-100 rounded">
									{/* <h2 className="text-xl font-semibold">{p.name}</h2> */}
									<div className="flex">
										<p className="font-bold text-xl">Descrição:</p>
										<p className="text-lg"> {p.description}</p>
									</div>
									<div>
										{p.tasks.map((t: any) => (
											<div key={t.id} className="p-4 bg-gray-200 rounded">
												<h2 className="text-xl font-semibold">{t.name}</h2>
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
