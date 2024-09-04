import { TaskStatus } from '../entities/task.entity';

export class CreateTaskDto {
  name: string;
  description: string;
  projectId?: number;
  data_de_vencimento: Date;
  status: TaskStatus;
}
