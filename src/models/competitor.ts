import { v4 as uuidv4 } from 'uuid';

export abstract class Competitor {
  protected _id: string;

  constructor() {
    this._id = uuidv4();
  }

  get id(): string {
    return this._id;
  }

  abstract get name(): string;
}
