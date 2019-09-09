import { Inject, Injectable } from '@nestjs/common';
import { HTTPClient } from 'geteventstore-promise';
import * as RandExp from 'randexp';
import {
  AddedTodo,
  CompletedTodo,
  RemovedTodo,
  RetitledTodo,
  UncompletedTodo,
} from '../../domain/events';
import { NotFoundTodo } from '../../domain/exceptions';
import { Todo, TodoId } from '../../domain/models';
import { Todos } from '../../domain/repository';

const eventFactories = {
  AddedTodo: (id: string, title: string) => AddedTodo.with(id, title),
  RetitledTodo: (id: string, title: string) => RetitledTodo.with(id, title),
  CompletedTodo: (id: string) => CompletedTodo.withId(id),
  UncompletedTodo: (id: string) => UncompletedTodo.withId(id),
  RemovedTodo: (id: string) => RemovedTodo.withId(id),
};

@Injectable()
export class EventStoreTodos implements Todos {
  constructor(
    @Inject('EVENT_STORE_HTTP_CLIENT') private readonly client: HTTPClient,
  ) {}

  async nextIdentity(): Promise<TodoId> {
    const uuid = new RandExp(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
    ).gen();
    const id = TodoId.fromUuid(uuid);

    return id;
  }

  async save(todo: Todo): Promise<void> {
    todo.commit();
  }

  /** @throws NotFoundTodo */
  async withId({ value: id }: TodoId): Promise<Todo> {
    const storeEvents = await this.client.getEvents(`todo-${id}`);

    if (storeEvents.length === 0) {
      throw NotFoundTodo.withId(id);
    }

    const todo = Reflect.construct(Todo, []);
    const events = storeEvents.map(({ eventType: type, data: event }) => {
      return eventFactories[type](...Object.values(event));
    });

    todo.loadFromHistory(events);

    return todo;
  }

  async remove(todo: Todo): Promise<void> {
    todo.remove().commit();
  }
}
