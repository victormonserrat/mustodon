import { ICommand } from '@nestjs/cqrs';

export class AddTodo implements ICommand {
  static with(id: string, title: string): AddTodo {
    return new this(id, title);
  }

  private constructor(readonly id: string, readonly title: string) {}
}
