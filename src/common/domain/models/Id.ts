import { InvalidId } from '../exceptions';
import { ValueObject } from './ValueObject';

export abstract class Id extends ValueObject<string> {
  protected constructor(uuid: string) {
    if (
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(
        uuid,
      )
    ) {
      throw InvalidId.causeNotValidUuid(uuid);
    }
    super(uuid);
  }
}
