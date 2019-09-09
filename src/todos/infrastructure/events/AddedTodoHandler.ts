import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { HTTPClient } from 'geteventstore-promise';
import { TodoViews } from '../../application/repositories';
import { AddedTodo } from '../../domain/events';

@EventsHandler(AddedTodo)
export class AddedTodoHandler implements IEventHandler<AddedTodo> {
  constructor(
    @Inject('EVENT_STORE_HTTP_CLIENT') private readonly client: HTTPClient,
    @Inject('TodoViews') private readonly views: TodoViews,
  ) {}

  async handle({ id, title }: AddedTodo): Promise<void> {
    this.client.writeEvent(`todo-${id}`, 'AddedTodo', { id, title });

    const view = {
      id,
      title,
      isCompleted: false,
    };

    this.views.save(view);
  }
}
