import { PartialType } from '@nestjs/mapped-types';
import { TaskStatus } from '../entities/task.entity';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  name: string;
  description: string;
  data_de_vencimento: Date;
  status: TaskStatus;
  projectId?: number;
}
