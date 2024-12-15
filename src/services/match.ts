import { Match } from '@/models/match';
import { Repository } from '@/utils/repository';

class PlayerManager {
  private static _repository = new Repository<Match>();

  public static addRound(round: Match): void {
    this._repository.add(round);
  }

  public static getRoundById(id: string): Match | undefined {
    return this._repository.get(id);
  }

  public static removeRound(id: string): void {
    this._repository.remove(id);
  }

  public static getAllRounds(): Match[] {
    return this._repository.getAll();
  }
}

export default PlayerManager;
