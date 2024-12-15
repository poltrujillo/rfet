import { Category, Size, Stars, Type } from '@/constants/tournament';
import { Bye } from '@/models/bye';
import { Competitor } from '@/models/competitor';
import { Match } from '@/models/match';
import { Player } from '@/models/player';
import { Round } from '@/models/round';
import { v4 as uuidv4 } from 'uuid';
import { getStarsByPlayersAndMoney } from '@/utils/stars';

export class Tournament {
  private _id: string;
  private _name: string;
  private _stars: Stars;
  private _byes: number;
  private _size: Size;
  private _priceMoney: number;
  private _category: Category;
  private _type: Type;
  private _competitors: Competitor[] = [];
  private _rounds: Round[] = [];
  private _initialDrawSize: number;

  public constructor(
    name: string,
    players: Player[],
    priceMoney: number = 0,
    category: Category = Category.ABSOLUTE,
    type: Type = Type.DEFAULT
  ) {
    this._id = uuidv4();
    this._name = name;
    this._priceMoney = priceMoney;
    this._category = category;
    this._type = type;
    this._stars = this.calculateStars(players, priceMoney);
    this._byes = this.calculateByes(players.length);
    this._size = this.calculateSize(players.length);
    this._competitors = this.calculateInitialCompetitors(players);
    this._initialDrawSize = this._competitors.length;
  }

  public start(): void {
    if (this._competitors.length === 0) {
      throw new Error('Cannot start a tournament with no competitors.');
    }
    this.createInitialRound();
  }

  private calculateByes(playerCount: number): number {
    const bracketSize = Math.pow(2, Math.ceil(Math.log2(playerCount)));
    return bracketSize - playerCount;
  }

  private calculateSize(playerCount: number): Size {
    const totalSize = playerCount + this._byes;
    if (totalSize <= 8) return Size.SIZE_8;
    if (totalSize <= 16) return Size.SIZE_16;
    if (totalSize <= 32) return Size.SIZE_32;
    if (totalSize <= 64) return Size.SIZE_64;
    return Size.SIZE_128;
  }

  private calculateStars(players: Player[], prizeMoney: number): Stars {
    return getStarsByPlayersAndMoney(players, prizeMoney);
  }

  private calculateInitialCompetitors(players: Player[]): Competitor[] {
    const competitors: Competitor[] = [...players];
    for (let i = 0; i < this._byes; i++) {
      competitors.push(new Bye());
    }
    return competitors;
  }

  public reorganizeCompetitors(newOrder: Competitor[]): void {
    if (newOrder.length !== this._competitors.length) {
      throw new Error('Reorganized competitors must match the total number.');
    }
    this._competitors = newOrder;
  }

  private createInitialRound(): void {
    const matches = [];

    for (let i = 0; i < this._competitors.length; i += 2) {
      const player1 = this._competitors[i];
      const player2 = this._competitors[i + 1] || new Bye();
      matches.push(new Match(player1, player2));
    }

    const firstRound = new Round(
      matches,
      1,
      this._competitors.length,
      this._initialDrawSize
    );
    this._rounds.push(firstRound);
  }

  public setWinner(
    roundNumber: number,
    matchIndex: number,
    winner: Player
  ): void {
    const round = this._rounds[roundNumber - 1];
    if (!round) {
      throw new Error(`Round ${roundNumber} does not exist.`);
    }

    const match = round.matches[matchIndex];
    if (!match) {
      throw new Error(
        `Match ${matchIndex + 1} does not exist in Round ${roundNumber}.`
      );
    }

    if (match.isComplete) {
      throw new Error(
        `Match ${matchIndex + 1} in Round ${roundNumber} is already complete.`
      );
    }

    match.setWinner(winner);

    // Progress to the next round only if the current round is complete
    if (round.isComplete()) {
      const currentRound = this._rounds[roundNumber - 1];
      const remainingCompetitors = currentRound.matches
        .map((m) => m.winner)
        .filter((competitor) => competitor !== null);

      if (remainingCompetitors.length > 1) {
        const nextRoundMatches: Match[] = [];
        for (let i = 0; i < remainingCompetitors.length; i += 2) {
          const player1 = remainingCompetitors[i];
          const player2 = remainingCompetitors[i + 1] || new Bye();
          nextRoundMatches.push(new Match(player1, player2));
        }

        const nextRound = new Round(
          nextRoundMatches,
          roundNumber + 1,
          this._initialDrawSize,
          this._initialDrawSize
        );
        this._rounds.push(nextRound);
      }
    }
  }

  public getTournamentDetails(): string {
    return `Tournament: ${this._name}\nStars: ${this._stars}\nCategory: ${this._category}\nType: ${this._type}\nPrize Money: ${this._priceMoney}€\nSize: ${this._size}\nByes: ${this._byes}`;
  }

  public get rounds() {
    return this._rounds;
  }

  public get name() {
    return this._name;
  }

  public get id(): string {
    return this._id;
  }

  public get competitors(): Competitor[] {
    return this._competitors;
  }
}
