import { Competitor } from './competitor';
import { v4 as uuidv4 } from 'uuid';

export class Bye extends Competitor {
  private _id: string;
  private _name: string;

  public constructor() {
    super();
    this._id = uuidv4();
    this._name = 'Bye';
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }
}
