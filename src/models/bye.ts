import { Competitor } from './competitor';
import { v4 as uuidv4 } from 'uuid';

export class Bye extends Competitor {
  private _name: string = 'Bye';
  constructor() {
    super();
  }

  get name(): string {
    return this._name;
  }
}
