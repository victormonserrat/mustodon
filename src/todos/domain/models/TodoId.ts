import { Id } from '../../../common/domain';

export class TodoId extends Id {
  static fromUuid(uuid: string): TodoId {
    return new this(uuid);
  }

  private constructor(uuid: string) {
    super(uuid);
  }
}
