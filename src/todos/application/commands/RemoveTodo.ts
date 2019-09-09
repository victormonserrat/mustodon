import { ICommand } from '@nestjs/cqrs';

export class RemoveTodo implements ICommand {
  static withId(id: string): RemoveTodo {
    return new this(id);
  }

  private constructor(readonly id: string) {}
}
