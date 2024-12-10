import { Bye } from '@/models/bye';
import { Competitor } from '@/models/competitor';
import { Player } from '@/models/player';
import { Tournament } from '@/models/tournament';

export default function Home() {
  const mockPlayers: Player[] = [
    new Player('Player 1', 1),
    new Player('Player 2', 50),
    new Player('Player 3', 200),
    new Player('Player 4', 300),
    new Player('Player 5', 450),
    new Player('Player 6', 700),
    new Player('Player 7', 900),
    new Player('Player 8', 1200),
    new Player('Player 9', 1500),
  ];

  const mockTournament = new Tournament('Mock Open', mockPlayers, 5000);

  // Reorganize competitors to avoid Bye vs Bye matches
  const competitors = mockTournament.competitors;

  // Separate players and byes
  const players = competitors.filter(
    (competitor) => !(competitor instanceof Bye)
  );
  const byes = competitors.filter((competitor) => competitor instanceof Bye);

  // Alternate between players and byes
  const organizedCompetitors: Competitor[] = [];
  let playerIndex = 0;
  let byeIndex = 0;

  for (let i = 0; i < competitors.length; i++) {
    if (i % 2 === 0 && playerIndex < players.length) {
      organizedCompetitors.push(players[playerIndex++]);
    } else if (byeIndex < byes.length) {
      organizedCompetitors.push(byes[byeIndex++]);
    } else if (playerIndex < players.length) {
      organizedCompetitors.push(players[playerIndex++]);
    }
  }

  mockTournament.reorganizeCompetitors(organizedCompetitors);
  mockTournament.start();

  // 8th round (Only one player vs player matchup. The other ones were Bye vs Player):
  mockTournament.setWinner(1, 7, mockPlayers[8]);

  console.log(mockTournament.rounds);

  // Quarter final:
  mockTournament.setWinner(2, 0, mockPlayers[0]);
  mockTournament.setWinner(2, 1, mockPlayers[2]);
  mockTournament.setWinner(2, 2, mockPlayers[4]);
  mockTournament.setWinner(2, 3, mockPlayers[6]);

  // // Set winners for Round 2
  // mockTournament.setWinner(2, 0, mockPlayers[0]);
  // mockTournament.setWinner(2, 1, mockPlayers[2]);
  // mockTournament.setWinner(2, 2, mockPlayers[4]);
  // mockTournament.setWinner(2, 3, mockPlayers[6]);

  // // Final
  // mockTournament.setWinner(3, 0, mockPlayers[0]);

  return <></>;
}
