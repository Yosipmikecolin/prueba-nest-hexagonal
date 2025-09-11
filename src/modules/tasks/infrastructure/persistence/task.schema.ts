import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from '../../domain/task.entity';

@Entity('tasks')
export class TaskSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: TaskStatus })
  status: TaskStatus;

  @Column({ type: 'date' })
  dueDate: Date;

  @Column('uuid')
  userId: string;

  @Column({ default: false })
  isDelete: boolean;
}
