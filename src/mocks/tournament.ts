// src/mocks/mockTournament.ts
import { Tournament } from '@/models/tournament';
import { Player } from '@/models/player';
import { Category } from '@/constants/tournament';

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

  return tournament;
  //   tournament.start();
  //   console.log(tournament);

  //   // Simulate some matches
  //   // First round matches (with 4 byes due to 12 players in a 16-player bracket)
  //   tournament.setWinner(1, 0, mockPlayers[0]); // Nadal wins first match
  //   tournament.setWinner(1, 1, mockPlayers[2]); // Federer wins second match
  //   tournament.setWinner(1, 2, mockPlayers[4]); // Wawrinka wins third match
  //   tournament.setWinner(1, 3, mockPlayers[6]); // Thiem wins fourth match

  //   // Quarter-finals
  //   tournament.setWinner(2, 0, mockPlayers[0]); // Nadal wins
  //   tournament.setWinner(2, 1, mockPlayers[2]); // Federer wins

  //   // Semi-final
  //   tournament.setWinner(3, 0, mockPlayers[0]); // Nadal wins and reaches final

  //   // You can log the tournament details to see the structure
  //   console.log('Tournament Details:', tournament.getTournamentDetails());
  //   console.log('\nAll Rounds:');
  //   tournament.rounds.forEach((round, index) => {
  //     console.log(`\nRound ${index + 1} (${round.roundType}):`);
  //     round.matches.forEach((match, matchIndex) => {
  //       console.log(`Match ${matchIndex + 1}:`, match.getMatchDetails());
  //     });
  //   });

  //   return tournament;
  // }

  // // Function to display the tournament in a more readable format
  // export function displayTournamentStructure(tournament: Tournament): void {
  //   console.log('='.repeat(50));
  //   console.log('TOURNAMENT STRUCTURE');
  //   console.log('='.repeat(50));
  //   console.log('\nTournament Details:');
  //   console.log(tournament.getTournamentDetails());

  //   console.log('\nRounds Structure:');
  //   tournament.rounds.forEach((round, roundIndex) => {
  //     console.log('\n' + '-'.repeat(30));
  //     console.log(`Round ${roundIndex + 1} - ${round.roundType}`);
  //     console.log('-'.repeat(30));

  //     round.matches.forEach((match, matchIndex) => {
  //       console.log(`\nMatch ${matchIndex + 1}:`);
  //       console.log(`Player 1: ${match.player1?.name || 'BYE'}`);
  //       console.log(`Player 2: ${match.player2?.name || 'BYE'}`);
  //       console.log(`Winner: ${match.winner?.name || 'Not played yet'}`);
  //     });
  //   });

  //   console.log('\n' + '='.repeat(50));
}

// Usage example:
// const mockTournament = createMockTournament();
// displayTournamentStructure(mockTournament);
