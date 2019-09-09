import { ICommand } from '@nestjs/cqrs';

export class CompleteTodo implements ICommand {
  static withId(id: string): CompleteTodo {
    return new this(id);
  }

  private constructor(readonly id: string) {}
}
