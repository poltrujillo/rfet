import { Competitor } from './competitor';

export class Bye extends Competitor {
  private _name: string;

  public constructor() {
    super();
    this._name = 'Bye';
  }

  public get name(): string {
    return this._name;
  }
}
