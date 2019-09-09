export class NotAddedTodo extends Error {
  static causeAlreadyExistsWithId(uuid: string): NotAddedTodo {
    return new this(`Todo with ${uuid} id already exists.`);
  }

  private constructor(reason: string) {
    super(reason);
  }
}
