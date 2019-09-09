export class NotFoundTodo extends Error {
  static withId(id: string): NotFoundTodo {
    return new this(`Todo with ${id} id can not be found.`);
  }

  private constructor(reason: string) {
    super(reason);
  }
}
