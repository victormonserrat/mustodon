import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundTodo } from '../../domain/exceptions';
import { TodoId } from '../../domain/models';
import { Todos } from '../../domain/repository';
import { TodoViews } from '../repositories';
import { UncompleteTodo } from './UncompleteTodo';

@CommandHandler(UncompleteTodo)
export class UncompleteTodoHandler implements ICommandHandler<UncompleteTodo> {
  constructor(
    @Inject('Todos') private readonly todos: Todos,
    @Inject('TodoViews') private readonly views: TodoViews,
    private readonly publisher: EventPublisher,
  ) {}

  async execute({ id }: UncompleteTodo): Promise<void> {
    if (!(await this.views.existsWithId(id))) {
      throw NotFoundTodo.withId(id);
    }

    const todo = this.publisher.mergeObjectContext(
      await this.todos.withId(TodoId.fromUuid(id)),
    );

    todo.uncomplete().commit();
    this.todos.save(todo);
  }
}
