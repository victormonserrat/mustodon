import { AggregateRoot as NestAggregateRoot } from '@nestjs/cqrs';
import { Entity } from './Entity';
import { Id } from './Id';

export abstract class AggregateRoot extends NestAggregateRoot
  implements Entity {
  protected _id: Id;

  isTheSameAs({ id }: AggregateRoot): boolean {
    return this.id.isEqualTo(id);
  }

  get id(): Id {
    return this._id;
  }

  protected constructor() {
    super();
  }
}
