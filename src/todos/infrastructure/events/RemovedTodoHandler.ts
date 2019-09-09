import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { HTTPClient } from 'geteventstore-promise';
import { TodoViews } from '../../application/repositories';
import { RemovedTodo } from '../../domain/events';

@EventsHandler(RemovedTodo)
export class RemovedTodoHandler implements IEventHandler<RemovedTodo> {
  constructor(
    @Inject('EVENT_STORE_HTTP_CLIENT') private readonly client: HTTPClient,
    @Inject('TodoViews') private readonly views: TodoViews,
  ) {}

  async handle({ id }: RemovedTodo): Promise<void> {
    this.client.writeEvent(`todo-${id}`, 'RemovedTodo', { id });

    const view = await this.views.withId(id);

    this.views.remove(view);
  }
}
