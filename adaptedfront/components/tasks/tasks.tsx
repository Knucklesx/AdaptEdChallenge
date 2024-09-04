"use client";
import axios from "axios";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { MyButton } from "../button/button";
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

	const handleDeleteTask = async (taskId: number) => {
		const tt = Object.values(projects.data);
		console.log(tt);
		try {
			await axios.delete(`http://localhost:3001/tasks/${taskId}`, {
				headers: {
					Authorization: `Bearer ${session?.access_token}`,
				},
			});
			setProjects((prevProjects) => ({
				...prevProjects,
				data: {
					...prevProjects.data,
					tasks: Object.values(tt[3]).filter((task) => task.id !== taskId),
				},
			}));
		} catch (err) {
			console.error(err);
		}
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	const myProj = Object.values(projects.data);
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
									<div className="flex">
										<p className="font-bold text-xl">Descrição:</p>
										<p className="text-lg"> {p.description}</p>
									</div>
									<div>
										{p.tasks.map((t: any) => (
											<div key={t.id} className="p-4 bg-gray-200 rounded my-10">
												<div className="flex justify-between items-center">
													<div>
														<div className="flex">
															<p className="text-xl font-bold">
																Nome da tarefa:
															</p>
															<h2 className="text-xl font-semibold mx-1">
																{t.name}
															</h2>
														</div>
														<div className="flex">
															<p className="font-bold">Descrição:</p>
															<p className="mx-1">{t.description}</p>
														</div>
														<div className="flex">
															<p className="font-bold">Data de Vencimento:</p>
															<p className="mx-1">
																{format(
																	new Date(t.data_de_vencimento),
																	"dd/MM/yyyy"
																)}
															</p>
														</div>
														<div className="flex">
															<p className="font-bold">Status:</p>
															<p className="mx-1">{t.status}</p>
														</div>
													</div>
													<MyButton
														text="Deletar"
														onClick={() => handleDeleteTask(t.id)}
														className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
													/>
												</div>
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
