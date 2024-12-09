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

  private calculateStars(): Stars {
    const starsFromTopPlayers = this.calculateStarsFromTopPlayers();
    const starsFromPrizeMoney = this.calculateStarsFromPrizeMoney();

    const totalStars = Math.min(
      starsFromTopPlayers + starsFromPrizeMoney,
      Stars.NINETEEN_STARS
    );

    return totalStars;
  }

  private calculateByes(): number {
    const size = this._players.length;
    if (size <= 8) return 8 - size;
    if (size <= 16) return 16 - size;
    if (size <= 32) return 32 - size;
    if (size <= 64) return 64 - size;
    return 0;
  }

  private calculateSize(): Size {
    const playerCount = this._players.length;
    if (playerCount <= 8) return Size.SIZE_8;
    if (playerCount <= 16) return Size.SIZE_16;
    if (playerCount <= 32) return Size.SIZE_32;
    if (playerCount <= 64) return Size.SIZE_64;
    return Size.SIZE_128;
  }

  private calculateStarsFromTopPlayers(): Stars {
    const topPlayers = this._players
      .sort((a, b) => a.ranking - b.ranking)
      .slice(0, 8);

    const points = topPlayers.reduce((sum, player) => {
      const ranking = player.ranking;
      if (ranking === 1) return sum + 1000;
      if (ranking === 2) return sum + 950;
      if (ranking === 3) return sum + 900;
      if (ranking === 4) return sum + 850;
      if (ranking === 5) return sum + 800;
      if (ranking === 6) return sum + 750;
      if (ranking === 7) return sum + 700;
      if (ranking === 8) return sum + 650;
      if (ranking >= 9 && ranking <= 10) return sum + 600;
      if (ranking >= 11 && ranking <= 15) return sum + 500;
      if (ranking >= 16 && ranking <= 20) return sum + 450;
      if (ranking >= 21 && ranking <= 25) return sum + 400;
      if (ranking >= 26 && ranking <= 30) return sum + 375;
      if (ranking >= 31 && ranking <= 35) return sum + 350;
      if (ranking >= 36 && ranking <= 40) return sum + 325;
      if (ranking >= 41 && ranking <= 50) return sum + 300;
      if (ranking >= 51 && ranking <= 60) return sum + 275;
      if (ranking >= 61 && ranking <= 70) return sum + 250;
      if (ranking >= 71 && ranking <= 80) return sum + 225;
      if (ranking >= 81 && ranking <= 90) return sum + 200;
      if (ranking >= 91 && ranking <= 100) return sum + 175;
      if (ranking >= 101 && ranking <= 125) return sum + 150;
      if (ranking >= 126 && ranking <= 150) return sum + 125;
      if (ranking >= 151 && ranking <= 175) return sum + 100;
      if (ranking >= 176 && ranking <= 300) return sum + 75;
      if (ranking >= 301 && ranking <= 500) return sum + 50;
      if (ranking >= 501 && ranking <= 1000) return sum + 45;
      if (ranking >= 1001 && ranking <= 2000) return sum + 40;
      if (ranking >= 2001 && ranking <= 4000) return sum + 35;
      if (ranking >= 4001 && ranking <= 7000) return sum + 30;
      if (ranking >= 7001 && ranking <= 11000) return sum + 25;
      if (ranking >= 11001 && ranking <= 13453) return sum + 20;
      if (ranking === 14149) return sum + 15;
      if (ranking === 14902) return sum + 10;
      if (ranking === 16491) return sum + 5;
      return sum;
    }, 0);

    if (points <= 50) return Stars.ONE_STAR;
    if (points <= 100) return Stars.TWO_STARS;
    if (points <= 150) return Stars.THREE_STARS;
    if (points <= 200) return Stars.FOUR_STARS;
    if (points <= 250) return Stars.FIVE_STARS;
    if (points <= 300) return Stars.SIX_STARS;
    if (points <= 350) return Stars.SEVEN_STARS;
    if (points <= 400) return Stars.EIGHT_STARS;
    if (points <= 450) return Stars.NINE_STARS;
    if (points <= 500) return Stars.TEN_STARS;
    if (points <= 600) return Stars.ELEVEN_STARS;
    if (points <= 700) return Stars.TWELVE_STARS;
    if (points <= 800) return Stars.THIRTEEN_STARS;
    if (points <= 1000) return Stars.FOURTEEN_STARS;
    if (points <= 1500) return Stars.FIFTEEN_STARS;
    if (points <= 2000) return Stars.SIXTEEN_STARS;
    if (points <= 2500) return Stars.SEVENTEEN_STARS;
    if (points <= 3000) return Stars.EIGHTEEN_STARS;
    return Stars.NINETEEN_STARS;
  }

  private calculateStarsFromPrizeMoney(): Stars {
    const prizeMoney = this._priceMoney;

    if (prizeMoney <= 300) return Stars.ONE_STAR;
    if (prizeMoney <= 600) return Stars.TWO_STARS;
    if (prizeMoney <= 1500) return Stars.THREE_STARS;
    if (prizeMoney <= 3000) return Stars.FOUR_STARS;
    if (prizeMoney <= 4500) return Stars.FIVE_STARS;
    if (prizeMoney <= 6000) return Stars.SIX_STARS;
    if (prizeMoney <= 7500) return Stars.SEVEN_STARS;
    if (prizeMoney <= 9000) return Stars.EIGHT_STARS;
    if (prizeMoney <= 12000) return Stars.NINE_STARS;
    if (prizeMoney <= 15000) return Stars.TEN_STARS;
    return Stars.ELEVEN_STARS;
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
