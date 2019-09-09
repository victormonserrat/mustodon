import { IEvent } from '@nestjs/cqrs';

export class UncompletedTodo implements IEvent {
  static withId(id: string): UncompletedTodo {
    return new this(id);
  }

  private constructor(readonly id: string) {}
}
