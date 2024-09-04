import { TasksDTO } from "./tasks.dto";

export interface ProjectsDTO {
	id: number;
	name: string;
	description: string;
	tasks: TasksDTO[];
}

export interface ProjectsReponse {
	data: ProjectsDTO[];
}
