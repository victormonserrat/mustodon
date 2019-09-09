import { IEvent } from '@nestjs/cqrs';

export class RemovedTodo implements IEvent {
  static withId(id: string): RemovedTodo {
    return new this(id);
  }

  private constructor(readonly id: string) {}
}
