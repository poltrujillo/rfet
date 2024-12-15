import { Player } from '@/models/player';
import { Repository } from '@/utils/storage/repository';

class PlayerManager {
  private static _repository = new Repository<Player>();

  public static addRound(round: Player): void {
    this._repository.add(round);
  }

  public static getRoundById(id: string): Player | undefined {
    return this._repository.get(id);
  }

  public static removeRound(id: string): void {
    this._repository.remove(id);
  }

  public static getAllRounds(): Player[] {
    return this._repository.getAll();
  }
}

export default PlayerManager;
