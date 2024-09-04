import { Project } from 'src/projects/entities/project.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum TaskStatus {
  DONE = 'done',
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  @Column()
  description: string;

  @Column()
  data_de_vencimento: Date;

  @Column()
  status: TaskStatus;

  @ManyToOne(() => Project, (project) => project.tasks, { eager: true })
  @JoinColumn({ name: 'id_project' })
  project: Project;
}
