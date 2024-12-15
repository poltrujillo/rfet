import { RankingGroup } from '@/constants/ranking';
import { Player } from '@/models/player';

describe('Player Model', () => {
  it('should create a player with a unique ID, name, and ranking', () => {
    const player = new Player('John Doe', 1);
    expect(player.id).toBeDefined();
    expect(player.name).toBe('John Doe');
    expect(player.ranking).toBe(1);
  });

  it('should generate unique IDs for each player', () => {
    const player1 = new Player('Player 1', 10);
    const player2 = new Player('Player 2', 20);
    expect(player1.id).not.toBe(player2.id);
  });

  it('should calculate the correct group for FIRST_CATEGORY (1-50)', () => {
    const player = new Player('First Category Player', 25);
    expect(player.group).toBe(RankingGroup.FIRST_CATEGORY);
  });

  it('should calculate the correct group for SECOND_CATEGORY_A (51-150)', () => {
    const player = new Player('Second Category A Player', 75);
    expect(player.group).toBe(RankingGroup.SECOND_CATEGORY_A);
  });

  it('should calculate the correct group for SECOND_CATEGORY_B (151-300)', () => {
    const player = new Player('Second Category B Player', 200);
    expect(player.group).toBe(RankingGroup.SECOND_CATEGORY_B);
  });

  it('should calculate the correct group for GROUP_10 (301-500)', () => {
    const player = new Player('Group 10 Player', 400);
    expect(player.group).toBe(RankingGroup.GROUP_10);
  });

  it('should calculate the correct group for GROUP_9 (501-1000)', () => {
    const player = new Player('Group 9 Player', 750);
    expect(player.group).toBe(RankingGroup.GROUP_9);
  });

  it('should calculate the correct group for GROUP_8 (1001-2000)', () => {
    const player = new Player('Group 8 Player', 1500);
    expect(player.group).toBe(RankingGroup.GROUP_8);
  });

  it('should calculate the correct group for GROUP_7 (2001-4000)', () => {
    const player = new Player('Group 7 Player', 3000);
    expect(player.group).toBe(RankingGroup.GROUP_7);
  });

  it('should calculate the correct group for GROUP_6 (4001-7000)', () => {
    const player = new Player('Group 6 Player', 5000);
    expect(player.group).toBe(RankingGroup.GROUP_6);
  });

  it('should calculate the correct group for GROUP_5 (7001-11000)', () => {
    const player = new Player('Group 5 Player', 8000);
    expect(player.group).toBe(RankingGroup.GROUP_5);
  });

  it('should calculate the correct group for GROUP_4 (11001-13453)', () => {
    const player = new Player('Group 4 Player', 12000);
    expect(player.group).toBe(RankingGroup.GROUP_4);
  });

  it('should calculate the correct group for GROUP_3 (14149)', () => {
    const player = new Player('Group 3 Player', 14149);
    expect(player.group).toBe(RankingGroup.GROUP_3);
  });

  it('should calculate the correct group for GROUP_2 (14902)', () => {
    const player = new Player('Group 2 Player', 14902);
    expect(player.group).toBe(RankingGroup.GROUP_2);
  });

  it('should calculate the correct group for GROUP_1 (16491)', () => {
    const player = new Player('Group 1 Player', 16491);
    expect(player.group).toBe(RankingGroup.GROUP_1);
  });

  it('should throw an error for invalid rankings', () => {
    expect(() => new Player('Invalid Ranking Player', 20000)).toThrow(
      new Error('Invalid ranking value for group calculation')
    );
  });
});
