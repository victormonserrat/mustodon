import { TodoView } from '../models';

export interface TodoViews {
  existsWithId(id: string): Promise<boolean>;
  save(view: TodoView): Promise<void>;
  all(): Promise<TodoView[]>;
  /** @throws NotFoundTodo */
  withId(id: string): Promise<TodoView>;
  remove(view: TodoView): Promise<void>;
}
