import { Task } from 'src/tasks/entities/task.entity';

export class CreateProjectDto {
  name: string;
  description: string;
  tasks?: Task[];
}
