import { IEvent } from '@nestjs/cqrs';

export class RetitledTodo implements IEvent {
  static with(id: string, title: string): RetitledTodo {
    return new this(id, title);
  }

  private constructor(readonly id: string, readonly title: string) {}
}
