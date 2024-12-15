import { Stars } from '@/constants/tournament';
import { Bye } from '@/models/bye';
import { Player } from '@/models/player';
import { Tournament } from '@/models/tournament';

jest.mock('@/utils/stars', () => ({
  getStarsByPlayersAndMoney: jest.fn().mockReturnValue(Stars.THREE_STARS),
}));

describe('Tournament Class', () => {
  let players: Player[];

  beforeEach(() => {
    players = [
      new Player('Player 1', 10),
      new Player('Player 2', 20),
      new Player('Player 3', 30),
      new Player('Player 4', 40),
    ];
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('should initialize a tournament correctly', () => {
    const tournament = new Tournament('Grand Slam', players, 10000);

    expect(tournament.id).toBeDefined();
    expect(tournament.competitors.length).toBe(4);
    expect(tournament.rounds.length).toBe(0);
    expect(tournament.getTournamentDetails()).toContain('Grand Slam');
    expect(tournament.getTournamentDetails()).toContain('Stars: 3');
  });

  it('should calculate the correct number of byes', () => {
    const tournament = new Tournament('Grand Slam', players, 10000);
    expect(tournament.competitors.length).toBe(4);
    expect(tournament.competitors.filter((c) => c instanceof Bye).length).toBe(
      0
    );
  });

  it('should calculate the correct tournament size', () => {
    const tournament = new Tournament('Grand Slam', players, 10000);
    expect(tournament.getTournamentDetails()).toContain('Size: 8');
  });

  it('should throw an error if trying to start a tournament with no competitors', () => {
    const tournament = new Tournament('Empty Tournament', [], 10000);
    expect(() => tournament.start()).toThrow(
      'Cannot start a tournament with no competitors.'
    );
  });

  it('should create the initial round when starting the tournament', () => {
    const tournament = new Tournament('Grand Slam', players, 10000);
    tournament.start();

    expect(tournament.rounds.length).toBe(1);
    expect(tournament.rounds[0].matches.length).toBe(2);
  });

  it('should correctly handle reorganization of competitors', () => {
    const tournament = new Tournament('Grand Slam', players, 10000);
    const newOrder = [...players.reverse()];
    tournament.reorganizeCompetitors(newOrder);

    expect(tournament.competitors[0].name).toBe(newOrder[0].name); // Fixed
    expect(tournament.competitors[3].name).toBe(newOrder[3].name);
  });

  it('should throw an error if reorganized competitors do not match the original count', () => {
    const tournament = new Tournament('Grand Slam', players, 10000);
    const newOrder = [new Player('Player 5', 50)];
    expect(() => tournament.reorganizeCompetitors(newOrder)).toThrow(
      'Reorganized competitors must match the total number.'
    );
  });

  it('should set a match winner and create the next round if the round is complete', () => {
    const tournament = new Tournament('Grand Slam', players, 10000);
    tournament.start();

    const firstRound = tournament.rounds[0];

    // Set winners for all matches in the first round
    firstRound.matches.forEach((match, index) => {
      if (match.player1 instanceof Player) {
        tournament.setWinner(1, index, match.player1);
      } else if (match.player2 instanceof Player) {
        tournament.setWinner(1, index, match.player2);
      }
    });

    expect(firstRound.isComplete()).toBe(true);

    // Verify the next round is created
    expect(tournament.rounds.length).toBe(2);
    expect(tournament.rounds[1].matches.length).toBe(1); // Semifinal for 4 players
  });

  it('should throw an error if trying to set a winner for a non-existent round', () => {
    const tournament = new Tournament('Grand Slam', players, 10000);
    tournament.start();

    expect(() => tournament.setWinner(2, 0, players[0])).toThrow(
      'Round 2 does not exist.'
    );
  });

  it('should throw an error if trying to set a winner for a non-existent match', () => {
    const tournament = new Tournament('Grand Slam', players, 10000);
    tournament.start();

    expect(() => tournament.setWinner(1, 5, players[0])).toThrow(
      'Match 6 does not exist in Round 1.'
    );
  });
});
