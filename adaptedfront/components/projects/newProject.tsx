"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewProject() {
	const { data: session, status } = useSession();
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [tasks, setTasks] = useState<any[]>([]);
	const [taskInput, setTaskInput] = useState({
		name: "",
		description: "",
		data_de_vencimento: "",
		status: "pending",
	});
	const router = useRouter();

	const handleAddTask = () => {
		if (
			taskInput.name.trim() &&
			taskInput.description.trim() &&
			taskInput.data_de_vencimento.trim()
		) {
			setTasks([...tasks, taskInput]);
			setTaskInput({
				name: "",
				description: "",
				data_de_vencimento: "",
				status: "pending",
			});
		}
	};

	const handleDeleteTask = (index: number) => {
		const newTasks = tasks.filter((_, i) => i !== index);
		setTasks(newTasks);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		console.log("submit", { name, description, tasks });
		try {
			const res = await axios.post(
				"http://localhost:3001/projects/",
				{
					name,
					description,
					tasks,
				},
				{
					headers: {
						Authorization: `Bearer ${session?.access_token}`,
					},
				}
			);
			if (res.status === 201) {
				router.push("/projects");
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<main className="flex justify-center items-center min-h-screen bg-slate-300">
			<div className="bg-white shadow-md rounded p-6 w-4/5">
				<h1 className="text-2xl font-bold mb-4">Novo Projeto</h1>
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
							value={name}
							onChange={(e) => setName(e.target.value)}
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
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="task"
							className="block text-sm font-medium text-gray-700"
						>
							Tarefas
						</label>
						<div className="flex flex-col space-y-2">
							<input
								type="text"
								placeholder="Nome da Tarefa"
								value={taskInput.name}
								onChange={(e) =>
									setTaskInput({ ...taskInput, name: e.target.value })
								}
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							/>
							<textarea
								placeholder="Descrição da Tarefa"
								value={taskInput.description}
								onChange={(e) =>
									setTaskInput({ ...taskInput, description: e.target.value })
								}
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							/>
							<input
								type="date"
								placeholder="Data de Vencimento"
								value={taskInput.data_de_vencimento}
								onChange={(e) =>
									setTaskInput({
										...taskInput,
										data_de_vencimento: e.target.value,
									})
								}
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							/>
							<select
								value={taskInput.status}
								onChange={(e) =>
									setTaskInput({ ...taskInput, status: e.target.value })
								}
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							>
								<option value="pending">Pendente</option>
								<option value="in_progress">Em Progresso</option>
								<option value="done">Concluída</option>
							</select>

							<button
								type="button"
								onClick={handleAddTask}
								className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
							>
								Adicionar Tarefa
							</button>
						</div>
						<ul className="mt-2">
							{tasks.map((task, index) => (
								<li
									key={index}
									className="bg-gray-100 p-2 rounded mt-1 flex justify-between items-center"
								>
									<div>
										<strong>Nome:</strong> {task.name} <br />
										<strong>Descrição:</strong> {task.description} <br />
										<strong>Data de Vencimento:</strong>{" "}
										{task.data_de_vencimento} <br />
										<strong>Status:</strong> {task.status}
									</div>
									<button
										type="button"
										onClick={() => handleDeleteTask(index)}
										className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
									>
										Deletar
									</button>
								</li>
							))}
						</ul>
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
