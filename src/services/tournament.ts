'use client';

import { Tournament } from '@/models/tournament';
import { LocalStorageRepository } from '@/utils/storage/localStorageRepository';
import { tournamentChanges } from '@/utils/events';

class TournamentManager {
  private static _repository: LocalStorageRepository<Tournament>;

  private static getRepository() {
    if (!this._repository) {
      this._repository = new LocalStorageRepository<Tournament>('tournaments');
    }
    return this._repository;
  }

  public static addTournament(tournament: Tournament): void {
    this.getRepository().add(tournament);
    tournamentChanges.emit();
  }

  public static getTournamentById(id: string): Tournament | undefined {
    return this.getRepository().get(id);
  }

  public static removeTournament(id: string): void {
    this.getRepository().remove(id);
    tournamentChanges.emit();
  }

  public static getAllTournaments(): Tournament[] {
    return this.getRepository().getAll();
  }
}

export default TournamentManager;
