import { ICommand } from '@nestjs/cqrs';

export class UncompleteTodo implements ICommand {
  static withId(id: string): UncompleteTodo {
    return new this(id);
  }

  private constructor(readonly id: string) {}
}
