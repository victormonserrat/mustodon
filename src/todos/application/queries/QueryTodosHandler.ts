import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TodoView } from '../models';
import { TodoViews } from '../repositories';
import { QueryTodos } from './QueryTodos';

@QueryHandler(QueryTodos)
export class QueryTodosHandler implements IQueryHandler<QueryTodos> {
  constructor(@Inject('TodoViews') private readonly views: TodoViews) {}

  async execute(query: QueryTodos): Promise<TodoView[]> {
    const views = this.views.all();

    return views;
  }
}
