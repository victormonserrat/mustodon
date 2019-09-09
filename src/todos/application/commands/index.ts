import { AddTodoHandler } from './AddTodoHandler';
import { CompleteTodoHandler } from './CompleteTodoHandler';
import { RemoveTodoHandler } from './RemoveTodoHandler';
import { RetitleTodoHandler } from './RetitleTodoHandler';
import { UncompleteTodoHandler } from './UncompleteTodoHandler';

export * from './AddTodo';
export * from './AddTodoHandler';
export * from './CompleteTodo';
export * from './CompleteTodoHandler';
export * from './RemoveTodo';
export * from './RemoveTodoHandler';
export * from './RetitleTodo';
export * from './RetitleTodoHandler';
export * from './UncompleteTodo';
export * from './UncompleteTodoHandler';
export const CommandHandlers = [
  AddTodoHandler,
  RetitleTodoHandler,
  CompleteTodoHandler,
  UncompleteTodoHandler,
  RemoveTodoHandler,
];
