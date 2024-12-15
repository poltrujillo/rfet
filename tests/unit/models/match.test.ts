import { Bye } from '@/models/bye';
import { Match } from '@/models/match';
import { Player } from '@/models/player';

describe('Match Class', () => {
  let player1: Player;
  let player2: Player;

  beforeEach(() => {
    player1 = new Player('Player 1', 10);
    player2 = new Player('Player 2', 20);
  });

  it('should create a match with two competitors', () => {
    const match = new Match(player1, player2);

    expect(match.player1).toBe(player1);
    expect(match.player2).toBe(player2);
    expect(match.isComplete).toBe(false);
    expect(match.winner).toBeNull();
  });

  it('should auto-complete the match if one competitor is a Bye', () => {
    const bye = new Bye();
    const match = new Match(player1, bye);

    expect(match.isComplete).toBe(true);
    expect(match.winner).toBe(player1);
  });

  it('should auto-complete the match if player2 is a Bye', () => {
    const bye = new Bye();
    const match = new Match(bye, player2);

    expect(match.isComplete).toBe(true);
    expect(match.winner).toBe(player2);
  });

  it('should set a winner and mark the match as complete', () => {
    const match = new Match(player1, player2);

    match.setWinner(player1);

    expect(match.isComplete).toBe(true);
    expect(match.winner).toBe(player1);
  });

  it('should throw an error when setting a winner for a completed match', () => {
    const match = new Match(player1, player2);

    match.setWinner(player1);

    expect(() => match.setWinner(player2)).toThrow(
      'The match is already complete.'
    );
  });

  it('should throw an error if the winner is not a competitor in the match', () => {
    const match = new Match(player1, player2);
    const outsider = new Player('Outsider', 30);

    expect(() => match.setWinner(outsider)).toThrow(
      'Winner must be one of the competitors in the match.'
    );
  });

  it('should provide match details with "TBD" if the winner is not yet determined', () => {
    const match = new Match(player1, player2);

    const details = match.getMatchDetails();

    expect(details).toBe('Player 1 vs Player 2 - Winner: TBD');
  });

  it('should provide match details with the winner’s name when the match is complete', () => {
    const match = new Match(player1, player2);

    match.setWinner(player1);

    const details = match.getMatchDetails();

    expect(details).toBe('Player 1 vs Player 2 - Winner: Player 1');
  });

  it('should generate a unique ID for each match', () => {
    const match1 = new Match(player1, player2);
    const match2 = new Match(player1, player2);

    expect(match1.id).not.toBe(match2.id);
  });
});
