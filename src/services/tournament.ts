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
    const tournament = this.getRepository().get(id);
    if (tournament) {
      // Ensure we create a proper Tournament instance
      const newTournament = new Tournament(
        tournament._name,
        tournament._competitors.filter((c) => !c._byes),
        tournament._priceMoney,
        tournament._category,
        tournament._type
      );
      // Copy over the stored properties
      Object.assign(newTournament, tournament);
      return newTournament;
    }
    return undefined;
  }

  public static removeTournament(id: string): void {
    this.getRepository().remove(id);
    tournamentChanges.emit();
  }

  public static getAllTournaments(): Tournament[] {
    try {
      const tournaments = this.getRepository().getAll();
      return tournaments.map((t) => {
        const tournament = new Tournament(
          t._name,
          [],
          t._priceMoney,
          t._category,
          t._type
        );
        Object.assign(tournament, {
          _id: t._id,
          _competitors: t._competitors,
          _rounds: t._rounds,
          _byes: t._byes,
          _size: t._size,
          _stars: t._stars,
          _initialDrawSize: t._initialDrawSize,
        });
        return tournament;
      });
    } catch (error) {
      console.error('Error getting tournaments:', error);
      return [];
    }
  }
}

export default TournamentManager;
