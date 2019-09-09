import { Id } from './Id';

export interface Entity {
  readonly id: Id;
  isTheSameAs(entity: Entity): boolean;
}
