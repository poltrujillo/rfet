import { RoundType, determineRoundType } from '@/constants/rounds';
import { Match } from '@/models/match';
import { Player } from '@/models/player';
import { Round } from '@/models/round';

jest.mock('@/constants/rounds', () => ({
  RoundType: {
    FINAL: 'Final',
    SEMI_FINAL: 'Semi Final',
    QUARTER_FINAL: 'Quarter Final',
    ROUND_OF_16: 'Round of 16',
    ROUND_OF_32: 'Round of 32',
    ROUND_OF_64: 'Round of 64',
    ROUND_OF_128: 'Round of 128',
  },
  determineRoundType: jest.fn(),
}));

describe('Round Class', () => {
  let player1: Player;
  let player2: Player;
  let player3: Player;
  let player4: Player;

  beforeEach(() => {
    player1 = new Player('Player 1', 10);
    player2 = new Player('Player 2', 20);
    player3 = new Player('Player 3', 30);
    player4 = new Player('Player 4', 40);

    // Mock determineRoundType
    (determineRoundType as jest.Mock).mockImplementation(
      (initialDrawSize, roundNumber) => {
        const totalRounds = Math.ceil(Math.log2(initialDrawSize));
        const roundsFromEnd = totalRounds - roundNumber;

        switch (roundsFromEnd) {
          case 0:
            return RoundType.FINAL;
          case 1:
            return RoundType.SEMI_FINAL;
          case 2:
            return RoundType.QUARTER_FINAL;
          default:
            return RoundType.ROUND_OF_32;
        }
      }
    );
  });

  it('should create a round with the correct RoundType based on totalPlayers and roundNumber', () => {
    const match1 = new Match(player1, player2);
    const match2 = new Match(player3, player4);
    const round = new Round([match1, match2], 1, 4, 4);

    expect(determineRoundType).toHaveBeenCalledWith(4, 1);
    expect(round.roundType).toBe(RoundType.SEMI_FINAL);
  });

  it('should handle a "Final" round correctly', () => {
    (determineRoundType as jest.Mock).mockReturnValue(RoundType.FINAL);

    const match = new Match(player1, player2);
    const round = new Round([match], 2, 2, 4);

    expect(round.roundType).toBe(RoundType.FINAL);
  });

  it('should throw an error for an invalid round number exceeding total rounds', () => {
    (determineRoundType as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid roundNumber: 4 exceeds totalRounds: 3');
    });

    expect(() => new Round([], 4, 8, 8)).toThrow(
      'Invalid roundNumber: 4 exceeds totalRounds: 3'
    );
  });

  it('should correctly calculate the next round matches for "Round of 16"', () => {
    (determineRoundType as jest.Mock).mockReturnValue(RoundType.ROUND_OF_16);

    const match1 = new Match(player1, player2);
    match1.setWinner(player1);

    const match2 = new Match(player3, player4);
    match2.setWinner(player3);

    const round = new Round([match1, match2], 2, 16, 16);
    const nextRoundMatches = round.getNextRoundMatches();

    expect(nextRoundMatches.length).toBe(1);
    expect(nextRoundMatches[0].player1).toBe(player1);
    expect(nextRoundMatches[0].player2).toBe(player3);
  });

  it('should return the correct summary for a partially completed round', () => {
    const match1 = new Match(player1, player2);
    match1.setWinner(player1);

    const match2 = new Match(player3, player4);

    const round = new Round([match1, match2], 2, 16, 16);

    expect(round.getRoundSummary()).toBe(
      'Quarter Final: 1/2 matches completed'
    );
  });

  it('should validate the round based on total players and round number', () => {
    const match1 = new Match(player1, player2);
    const match2 = new Match(player3, player4);

    const round = new Round([match1, match2], 1, 4, 4);

    expect(round.validateRound()).toBe(true);
  });

  it('should invalidate a round with incorrect match count', () => {
    const match1 = new Match(player1, player2);

    const round = new Round([match1], 1, 8, 8);

    expect(round.validateRound()).toBe(false);
  });

  it('should throw an error when trying to get winners for an incomplete round', () => {
    const match1 = new Match(player1, player2);
    const match2 = new Match(player3, player4);

    const round = new Round([match1, match2], 1, 4, 4);

    expect(() => round.getWinners()).toThrow(
      'Cannot get winners: round is not complete'
    );
  });
});
