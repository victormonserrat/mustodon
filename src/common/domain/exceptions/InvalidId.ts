export class InvalidId extends Error {
  static causeNotValidUuid(uuid: string): InvalidId {
    return new this(`${uuid} is not a valid uuid.`);
  }

  private constructor(reason: string) {
    super(reason);
  }
}
