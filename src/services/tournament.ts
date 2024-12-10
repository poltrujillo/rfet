import { Tournament } from '@/models/tournament';
import { Repository } from '@/utils/repository';
import { UUID } from 'crypto';

class TournamentManager {
  private static _repository = new Repository<Tournament>();

  public static addRound(round: Tournament): void {
    this._repository.add(round);
  }

  public static getRoundById(id: UUID): Tournament | undefined {
    return this._repository.get(id);
  }

  public static removeRound(id: UUID): void {
    this._repository.remove(id);
  }

  public static getAllRounds(): Tournament[] {
    return this._repository.getAll();
  }
}

export default TournamentManager;
