export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export class Task {
  constructor(
    public title: string,
    public description: string,
    public status: TaskStatus,
    public readonly dueDate: Date = new Date(),
    public userId: string,
    public isDelete: boolean = false,
  ) {}
}
