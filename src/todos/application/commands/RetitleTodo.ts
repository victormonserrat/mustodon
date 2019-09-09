import { ICommand } from '@nestjs/cqrs';

export class RetitleTodo implements ICommand {
  static with(id: string, title: string): RetitleTodo {
    return new this(id, title);
  }

  private constructor(readonly id: string, readonly title: string) {}
}
