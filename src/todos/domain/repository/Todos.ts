import { Todo, TodoId } from '../models';

export interface Todos {
  nextIdentity(): Promise<TodoId>;
  save(todo: Todo): Promise<void>;
  /** @throws NotFoundTodo */
  withId(id: TodoId): Promise<Todo>;
  /** @throws NotFoundTodo */
  remove(todo: Todo): Promise<void>;
}
