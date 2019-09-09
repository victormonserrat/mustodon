export class QueryTodos {
  static with(): QueryTodos {
    return new this();
  }

  private constructor() {}
}
