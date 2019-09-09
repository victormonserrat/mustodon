import { DeleteTodo } from './DeleteTodo';
import { GetTodo } from './GetTodo';
import { GetTodos } from './GetTodos';
import { PostTodo } from './PostTodo';
import { PutTodo } from './PutTodo';

export * from './DeleteTodo';
export * from './GetTodo';
export * from './GetTodos';
export * from './PostTodo';
export * from './PutTodo';
export const Controllers = [GetTodos, PostTodo, GetTodo, PutTodo, DeleteTodo];
