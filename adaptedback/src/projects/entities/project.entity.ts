import { Login } from 'src/login/entities/login.entity';
import { Task } from 'src/tasks/entities/task.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  @Column()
  description: string;

  @ManyToOne(() => Login, (user) => user.projects)
  login: Login;

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];
}
