import { AddedTodoHandler } from './AddedTodoHandler';
import { CompletedTodoHandler } from './CompletedTodoHandler';
import { RemovedTodoHandler } from './RemovedTodoHandler';
import { RetitledTodoHandler } from './RetitledTodoHandler';
import { UncompletedTodoHandler } from './UncompletedTodoHandler';

export * from './AddedTodoHandler';
export * from './CompletedTodoHandler';
export * from './RemovedTodoHandler';
export * from './RetitledTodoHandler';
export * from './UncompletedTodoHandler';
export const EventHandlers = [
  AddedTodoHandler,
  RetitledTodoHandler,
  CompletedTodoHandler,
  UncompletedTodoHandler,
  RemovedTodoHandler,
];
