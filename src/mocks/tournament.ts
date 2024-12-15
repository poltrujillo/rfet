// src/mocks/mockTournament.ts
import { Tournament } from '@/models/tournament';
import { Player } from '@/models/player';
import { Category } from '@/constants/tournament';
import { Bye } from '@/models/bye';
import { Competitor } from '@/models/competitor';

// Create mock players with different rankings
const mockPlayers: Player[] = [
  new Player('Rafael Nadal', 1),
  new Player('Novak Djokovic', 2),
  new Player('Roger Federer', 3),
  new Player('Andy Murray', 4),
  new Player('Stan Wawrinka', 5),
  new Player('Alexander Zverev', 6),
  new Player('Dominic Thiem', 7),
  new Player('Stefanos Tsitsipas', 8),
  new Player('Daniil Medvedev', 9),
  new Player('Matteo Berrettini', 10),
  new Player('Denis Shapovalov', 11),
  new Player('Felix Auger-Aliassime', 12),
];

// Create a mock tournament
export function createMockTournament(): Tournament {
  // Create tournament with 12 players, 10000€ prize money
  const tournament = new Tournament(
    'Mock Grand Slam 2023',
    mockPlayers,
    10000,
    Category.ABSOLUTE
  );

  // Separate players and byes
  const players = tournament.competitors.filter((c) => c instanceof Player);
  const byes = tournament.competitors.filter((c) => c instanceof Bye);

  // Create the new order
  const newOrder: Competitor[] = [];
  let playerIndex = 0;
  let byeIndex = 0;

  for (let i = 0; i < tournament.competitors.length; i++) {
    // Add a bye every 3rd position until we run out of byes
    if (byeIndex < byes.length && i % 3 === 1) {
      newOrder.push(byes[byeIndex]);
      byeIndex++;
    } else if (playerIndex < players.length) {
      newOrder.push(players[playerIndex]);
      playerIndex++;
    }
  }

  // Add any remaining competitors
  while (playerIndex < players.length) {
    newOrder.push(players[playerIndex]);
    playerIndex++;
  }
  while (byeIndex < byes.length) {
    newOrder.push(byes[byeIndex]);
    byeIndex++;
  }

  // Reorganize the tournament with the new order
  tournament.reorganizeCompetitors(newOrder);

  // Start the tournament
  tournament.start();

  return tournament;
}
