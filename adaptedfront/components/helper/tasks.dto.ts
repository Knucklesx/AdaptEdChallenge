export interface TasksDTO {
	id: number;
	title: string;
	description: string;
}

export interface TasksResponse {
	data: TasksDTO[];
	// meta: MetaResponse;
}
