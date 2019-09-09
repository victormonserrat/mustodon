import { ICommand } from '@nestjs/cqrs';

export class CompletedTodo implements ICommand {
  static withId(id: string): CompletedTodo {
    return new this(id);
  }

  private constructor(readonly id: string) {}
}
