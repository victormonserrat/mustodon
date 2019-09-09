import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundTodo } from '../../domain/exceptions';
import { TodoId } from '../../domain/models';
import { Todos } from '../../domain/repository';
import { TodoViews } from '../repositories';
import { RemoveTodo } from './RemoveTodo';

@CommandHandler(RemoveTodo)
export class RemoveTodoHandler implements ICommandHandler<RemoveTodo> {
  constructor(
    @Inject('Todos') private readonly todos: Todos,
    @Inject('TodoViews') private readonly views: TodoViews,
    private readonly publisher: EventPublisher,
  ) {}

  async execute({ id }: RemoveTodo): Promise<void> {
    if (!(await this.views.existsWithId(id))) {
      throw NotFoundTodo.withId(id);
    }

    const todo = this.publisher.mergeObjectContext(
      await this.todos.withId(TodoId.fromUuid(id)),
    );

    this.todos.remove(todo);
  }
}
