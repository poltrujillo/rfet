import { Match } from '@/models/match';
import { Repository } from '@/utils/repository';
import { UUID } from 'crypto';

class PlayerManager {
  private static _repository = new Repository<Match>();

  public static addRound(round: Match): void {
    this._repository.add(round);
  }

  public static getRoundById(id: UUID): Match | undefined {
    return this._repository.get(id);
  }

  public static removeRound(id: UUID): void {
    this._repository.remove(id);
  }

  public static getAllRounds(): Match[] {
    return this._repository.getAll();
  }
}

export default PlayerManager;
