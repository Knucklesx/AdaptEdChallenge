// addTasks.ts
import { Project } from 'src/projects/entities/project.entity';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { Task } from 'src/tasks/entities/task.entity';

export default async function AddTask(
  createTaskDTO: CreateTaskDto,
  project: Project,
): Promise<Task> {
  const task = new Task();
  task.name = createTaskDTO.name;
  task.description = createTaskDTO.description;
  task.data_de_vencimento = createTaskDTO.data_de_vencimento;
  task.status = createTaskDTO.status;
  task.project = project;
  return task;
}
