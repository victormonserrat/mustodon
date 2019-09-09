import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { HTTPClient } from 'geteventstore-promise';
import { TodoViews } from '../../application/repositories';
import { RetitledTodo } from '../../domain/events';

@EventsHandler(RetitledTodo)
export class RetitledTodoHandler implements IEventHandler<RetitledTodo> {
  constructor(
    @Inject('EVENT_STORE_HTTP_CLIENT') private readonly client: HTTPClient,
    @Inject('TodoViews') private readonly views: TodoViews,
  ) {}

  async handle({ id, title }: RetitledTodo): Promise<void> {
    this.client.writeEvent(`todo-${id}`, 'RetitledTodo', { id, title });

    const { isCompleted } = await this.views.withId(id);
    const view = {
      id,
      title,
      isCompleted,
    };

    this.views.save(view);
  }
}
