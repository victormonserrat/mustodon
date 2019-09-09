import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundTodo } from '../../domain/exceptions';
import { TodoId, TodoTitle } from '../../domain/models';
import { Todos } from '../../domain/repository';
import { TodoViews } from '../repositories';
import { RetitleTodo } from './RetitleTodo';

@CommandHandler(RetitleTodo)
export class RetitleTodoHandler implements ICommandHandler<RetitleTodo> {
  constructor(
    @Inject('Todos') private readonly todos: Todos,
    @Inject('TodoViews') private readonly views: TodoViews,
    private readonly publisher: EventPublisher,
  ) {}

  async execute({ id, title }: RetitleTodo): Promise<void> {
    if (!(await this.views.existsWithId(id))) {
      throw NotFoundTodo.withId(id);
    }

    const todo = this.publisher.mergeObjectContext(
      await this.todos.withId(TodoId.fromUuid(id)),
    );

    todo.retitle(TodoTitle.fromString(title)).commit();
    this.todos.save(todo);
  }
}
