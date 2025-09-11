export class User {
  constructor(
    public email: string,
    public name: string,
    public readonly createdAt: Date = new Date(),
  ) {}
}
