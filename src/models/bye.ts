import { Competitor } from './competitor';
import { v4 as uuidv4 } from 'uuid';

export class Bye extends Competitor {
  constructor() {
    super();
  }

  get name(): string {
    return 'Bye';
  }
}
