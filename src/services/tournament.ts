'use client';

import { Tournament } from '@/models/tournament';
import { LocalStorageRepository } from '@/utils/storage/localStorageRepository';

class TournamentManager {
  private static _repository = new LocalStorageRepository<Tournament>(
    'tournaments'
  );

  public static addTournament(round: Tournament): void {
    this._repository.add(round);
  }

  public static getTournamentById(id: string): Tournament | undefined {
    return this._repository.get(id);
  }

  public static removeTournament(id: string): void {
    this._repository.remove(id);
  }

  public static getAllTournaments(): Tournament[] {
    return this._repository.getAll();
  }
}

export default TournamentManager;
