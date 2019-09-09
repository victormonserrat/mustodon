import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Todo, TodoId, TodoTitle } from '../../domain/models';
import { Todos } from '../../domain/repository';
import { NotAddedTodo } from '../exceptions';
import { TodoViews } from '../repositories';
import { AddTodo } from './AddTodo';

@CommandHandler(AddTodo)
export class AddTodoHandler implements ICommandHandler<AddTodo> {
  constructor(
    @Inject('Todos') private readonly todos: Todos,
    @Inject('TodoViews') private readonly views: TodoViews,
    private readonly publisher: EventPublisher,
  ) {}

  async execute({ id, title }: AddTodo): Promise<void> {
    if (await this.views.existsWithId(id)) {
      throw NotAddedTodo.causeAlreadyExistsWithId(id);
    }

    const todo = this.publisher.mergeObjectContext(
      Todo.add(TodoId.fromUuid(id), TodoTitle.fromString(title)),
    );

    this.todos.save(todo);
  }
}
