import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { HTTPClient } from 'geteventstore-promise';
import { TodoViews } from '../../application/repositories';
import { UncompletedTodo } from '../../domain/events';

@EventsHandler(UncompletedTodo)
export class UncompletedTodoHandler implements IEventHandler<UncompletedTodo> {
  constructor(
    @Inject('EVENT_STORE_HTTP_CLIENT') private readonly client: HTTPClient,
    @Inject('TodoViews') private readonly views: TodoViews,
  ) {}

  async handle({ id }: UncompletedTodo): Promise<void> {
    this.client.writeEvent(`todo-${id}`, 'UncompletedTodo', { id });

    const { title } = await this.views.withId(id);
    const view = {
      id,
      title,
      isCompleted: false,
    };

    this.views.save(view);
  }
}
