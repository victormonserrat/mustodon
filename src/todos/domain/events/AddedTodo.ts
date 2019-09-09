import { IEvent } from '@nestjs/cqrs';

export class AddedTodo implements IEvent {
  static with(id: string, title: string): AddedTodo {
    return new this(id, title);
  }

  private constructor(readonly id: string, readonly title: string) {}
}
