import { shallowEqual } from 'shallow-equal-object';

export abstract class ValueObject<T> {
  protected constructor(readonly value: T) {}

  isEqualTo(valueObject: ValueObject<T>): boolean {
    if (typeof this !== typeof valueObject) {
      return false;
    }

    return shallowEqual(this.value, valueObject.value);
  }
}
