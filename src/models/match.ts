import { Bye } from "./bye";
import { Competitor } from "./competitor";
import { Player } from "./player";

export class Match {
  private _player1: Competitor | null;
  private _player2: Competitor | null;
  private _winner: Competitor | null = null;
  private _isComplete: boolean = false;

  constructor(player1: Competitor, player2: Competitor) {
    this._player1 = player1;
    this._player2 = player2;

    // Automatically complete the match if one competitor is a Bye
    if (player1 instanceof Player && player2 instanceof Competitor && player2 instanceof Player === false) {
      this._winner = player1;
      this._isComplete = true;
    } else if (player2 instanceof Player && player1 instanceof Competitor && player1 instanceof Bye) {
      this._winner = player2;
      this._isComplete = true;
    }
  }

  public setWinner(winner: Competitor): void {
    if (this._isComplete) {
      throw new Error("The match is already complete.");
    }

    if (winner !== this._player1 && winner !== this._player2) {
      throw new Error("Winner must be one of the competitors in the match.");
    }

    this._winner = winner;
    this._isComplete = true;
  }

  public get isComplete(): boolean {
    return this._isComplete;
  }

  public get winner(): Competitor | null {
    return this._winner;
  }

  public getMatchDetails(): string {
    const player1Name = this._player1?.name;
    const player2Name = this._player2?.name;
    const winnerName = this._winner ? this._winner.name : "TBD";
    return `${player1Name} vs ${player2Name} - Winner: ${winnerName}`;
  }
}
