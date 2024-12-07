import { Match } from './match';

export class Round {
  private _matches: Match[];

  constructor(matches: Match[]) {
    this._matches = matches;
  }

  // FIXME: Maybe we don't need to give the option to add any more matches when class initialized
  public addMatch(match: Match): void {
    this._matches.push(match);
  }

  public isComplete(): boolean {
    return this._matches.every((match) => match.isComplete);
  }

  public get matches(): Match[] {
    return this._matches;
  }

  public getMatchDetails(): string[] {
    return this._matches.map(
      (match, index) => `Match ${index + 1}: ${match.getMatchDetails()}`
    );
  }
}
