import { Player } from '@/models/player';
import { Repository } from '@/utils/repository';
import { UUID } from 'crypto';

class PlayerManager {
  private static _repository = new Repository<Player>();

  public static addRound(round: Player): void {
    this._repository.add(round);
  }

  public static getRoundById(id: UUID): Player | undefined {
    return this._repository.get(id);
  }

  public static removeRound(id: UUID): void {
    this._repository.remove(id);
  }

  public static getAllRounds(): Player[] {
    return this._repository.getAll();
  }
}

export default PlayerManager;
