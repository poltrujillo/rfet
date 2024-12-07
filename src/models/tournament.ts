import { Category, Size, Stars, Type } from '@/constants/tournament';
import { randomUUID, UUID } from 'crypto';
import { Player } from './player';
import { Round } from './round';

export class Tournament {
  private _id: UUID;
  private _name: string;
  private _stars: Stars;
  private _byes: number;
  private _size: Size;
  private _priceMoney: number;
  private _category: Category;
  private _type: Type;
  private _players: Player[];
  private _rounds: Round[] = [];

  public constructor(
    name: string,
    players: Player[],
    category: Category = Category.ABSOLUTE,
    priceMoney: number = 0,
    type: Type = Type.DEFAULT
  ) {
    this._id = randomUUID();
    this._name = name;
    this._players = players;
    this._priceMoney = priceMoney;
    this._category = category;
    this._type = type;
    this._stars = this.calculateStars();
    this._byes = this.calculateByes();
    this._size = this.calculateSize();
  }

  public start(): void {}

  // TODO
  private calculateStars(): Stars {
    return Stars.PLACEHOLDER;
  }

  // TODO
  private calculateByes(): number {
    return 0;
  }

  // TODO
  private calculateSize(): Size {
    return Size.SIZE_16;
  }
}

// IDEA:

// class Draw {
//     rounds: Round[] = [];

//     constructor(public players: Player[]) {
//       this.validatePlayers();
//       this.createInitialRound();
//     }

//     /**
//      * Create the initial round from the list of players.
//      */
//     private createInitialRound(): void {
//       const round = new Round(1);
//       for (let i = 0; i < this.players.length; i += 2) {
//         const player1 = this.players[i];
//         const player2 = this.players[i + 1];
//         round.addMatchup(new Matchup(player1, player2));
//       }
//       this.rounds.push(round);
//     }

//     /**
//      * Generate the next round based on winners of the current round.
//      */
//     generateNextRound(): void {
//       const currentRound = this.rounds[this.rounds.length - 1];
//       if (!currentRound.isComplete()) {
//         throw new Error("Current round is not complete.");
//       }

//       const nextRound = new Round(this.rounds.length + 1);
//       for (const matchup of currentRound.matches) {
//         if (matchup.winner === null) {
//           throw new Error("All matches in the current round must have a winner.");
//         }
//         nextRound.addMatchup(new Matchup(matchup.winner, null));
//       }

//       // Pair up players in the next round
//       for (let i = 0; i < nextRound.matches.length - 1; i += 2) {
//         nextRound.matches[i].player2 = nextRound.matches[i + 1].player1;
//       }

//       this.rounds.push(nextRound);
//     }

// OR:

// generateNextRound(): void {
//     const currentRound = this.rounds[this.rounds.length - 1];

//     if (!currentRound.isComplete()) {
//         throw new Error("Current round is not complete.");
//     }

//     const winners: Player[] = currentRound.matches.map(matchup => {
//         if (!matchup.winner) {
//             throw new Error("All matches must have a winner.");
//         }
//         return matchup.winner;
//     });

//     const nextRound = new Round(this.rounds.length + 1);

//     for (let i = 0; i < winners.length; i += 2) {
//         const player1 = winners[i];
//         const player2 = winners[i + 1] || null; // Handle odd numbers (e.g., byes)
//         nextRound.addMatchup(new Matchup(player1, player2));
//     }

//     this.rounds.push(nextRound);
// }

//     /**
//      * Print the draw structure for visualization.
//      */
//     printDraw(): void {
//       console.log("Tournament Draw:");
//       for (const round of this.rounds) {
//         console.log(`Round ${round.roundNumber}:`);
//         round.matches.forEach((matchup, index) => {
//           const p1 = matchup.player1?.name ?? "Bye";
//           const p2 = matchup.player2?.name ?? "Bye";
//           const winner = matchup.winner?.name ?? "TBD";
//           console.log(`  Match ${index + 1}: ${p1} vs ${p2} - Winner: ${winner}`);
//         });
//       }
//     }
//   }
