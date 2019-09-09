export class QueryTodo {
  static withId(id: string): QueryTodo {
    return new this(id);
  }

  private constructor(readonly id: string) {}
}
