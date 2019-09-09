import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TodoView } from '../models';
import { TodoViews } from '../repositories';
import { QueryTodo } from './QueryTodo';

@QueryHandler(QueryTodo)
export class QueryTodoHandler implements IQueryHandler<QueryTodo> {
  constructor(@Inject('TodoViews') private readonly views: TodoViews) {}

  async execute({ id }: QueryTodo): Promise<TodoView> {
    const view = this.views.withId(id);

    return view;
  }
}
