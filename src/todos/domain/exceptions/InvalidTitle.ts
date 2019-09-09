export class InvalidTitle extends Error {
  static causeBlankString(): InvalidTitle {
    return new this('Todo title can not be a blank string.');
  }

  private constructor(reason: string) {
    super(reason);
  }
}
