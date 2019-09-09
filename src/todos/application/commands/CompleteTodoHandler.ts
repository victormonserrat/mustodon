import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundTodo } from '../../domain/exceptions';
import { TodoId } from '../../domain/models';
import { Todos } from '../../domain/repository';
import { TodoViews } from '../repositories';
import { CompleteTodo } from './CompleteTodo';

@CommandHandler(CompleteTodo)
export class CompleteTodoHandler implements ICommandHandler<CompleteTodo> {
  constructor(
    @Inject('Todos') private readonly todos: Todos,
    @Inject('TodoViews') private readonly views: TodoViews,
    private readonly publisher: EventPublisher,
  ) {}

  async execute({ id }: CompleteTodo): Promise<void> {
    if (!(await this.views.existsWithId(id))) {
      throw NotFoundTodo.withId(id);
    }

    const todo = this.publisher.mergeObjectContext(
      await this.todos.withId(TodoId.fromUuid(id)),
    );

    todo.complete().commit();
    this.todos.save(todo);
  }
}
