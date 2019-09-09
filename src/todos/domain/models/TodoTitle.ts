import { ValueObject } from '../../../common/domain';
import { InvalidTitle } from '../exceptions';

export class TodoTitle extends ValueObject<string> {
  static fromString(title: string): TodoTitle {
    const trimmedTitle = title.trim();

    if (trimmedTitle.length === 0) {
      throw InvalidTitle.causeBlankString();
    }

    return new this(trimmedTitle);
  }

  private constructor(title: string) {
    super(title);
  }
}
