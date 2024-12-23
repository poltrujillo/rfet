import { Match } from './match';
import { RoundType, determineRoundType } from '@/constants/rounds';
import { Player } from '@/models/player';
import { v4 as uuidv4 } from 'uuid';

export class Round {
  private _id: string;
  private _matches: Match[];
  private _roundType: RoundType;
  private _roundNumber: number;
  private _totalPlayers: number;
  private _initialDrawSize: number; // Add this

  public constructor(
    matches: Match[],
    roundNumber: number,
    totalPlayers: number,
    initialDrawSize: number
  ) {
    this._id = uuidv4();
    this._matches = matches;
    this._roundNumber = roundNumber;
    this._totalPlayers = totalPlayers;
    this._initialDrawSize = initialDrawSize;
    this._roundType = determineRoundType(totalPlayers, roundNumber);
  }

  public get roundType(): RoundType {
    return this._roundType;
  }

  public get id(): string {
    return this._id;
  }

  public get roundNumber(): number {
    return this._roundNumber;
  }

  public get matches(): Match[] {
    return this._matches;
  }

  public isComplete(): boolean {
    return this._matches.every((match) => match.isComplete);
  }

  public getWinners(): Player[] {
    if (!this.isComplete()) {
      throw new Error('Cannot get winners: round is not complete');
    }
    return this._matches
      .map((match) => match.winner)
      .filter((winner): winner is Player => winner instanceof Player);
  }

  public getMatchDetails(): string[] {
    return this._matches.map(
      (match, index) =>
        `${this._roundType} - Match ${index + 1}: ${match.getMatchDetails()}`
    );
  }

  public getRoundSummary(): string {
    const completedMatches = this._matches.filter(
      (match) => match.isComplete
    ).length;
    const totalMatches = this._matches.length;

    return `${this._roundType}: ${completedMatches}/${totalMatches} matches completed`;
  }

  public getNextRoundMatches(): Match[] {
    if (!this.isComplete()) {
      throw new Error(
        'Cannot create next round: current round is not complete'
      );
    }

    const winners = this.getWinners();
    const nextRoundMatches: Match[] = [];

    // Pair winners for next round
    for (let i = 0; i < winners.length; i += 2) {
      if (i + 1 < winners.length) {
        nextRoundMatches.push(new Match(winners[i], winners[i + 1]));
      }
    }

    return nextRoundMatches;
  }

  public validateRound(): boolean {
    const expectedMatches = this._totalPlayers / Math.pow(2, this._roundNumber);
    if (this._matches.length !== Math.floor(expectedMatches)) {
      return false;
    }

    return this._matches.every((match) => {
      const player1 = match.player1;
      const player2 = match.player2;
      return player1 !== null && player2 !== null;
    });
  }
}
