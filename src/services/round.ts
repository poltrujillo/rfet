import { Round } from '@/models/round';
import { Repository } from '@/utils/repository';
import { UUID } from 'crypto';

class RoundManager {
  private static _repository = new Repository<Round>();

  public static addRound(round: Round): void {
    this._repository.add(round);
  }

  public static getRoundById(id: UUID): Round | undefined {
    return this._repository.get(id);
  }

  public static removeRound(id: UUID): void {
    this._repository.remove(id);
  }

  public static getAllRounds(): Round[] {
    return this._repository.getAll();
  }
}

export default RoundManager;
