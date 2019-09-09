import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { HTTPClient } from 'geteventstore-promise';
import { TodoViews } from '../../application/repositories';
import { CompletedTodo } from '../../domain/events';

@EventsHandler(CompletedTodo)
export class CompletedTodoHandler implements IEventHandler<CompletedTodo> {
  constructor(
    @Inject('EVENT_STORE_HTTP_CLIENT') private readonly client: HTTPClient,
    @Inject('TodoViews') private readonly views: TodoViews,
  ) {}

  async handle({ id }: CompletedTodo): Promise<void> {
    this.client.writeEvent(`todo-${id}`, 'CompletedTodo', { id });

    const { title } = await this.views.withId(id);
    const view = {
      id,
      title,
      isCompleted: true,
    };

    this.views.save(view);
  }
}
