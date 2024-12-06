import { RankingGroup } from '@/constants/ranking';
import { Player } from '@/models/player';

// TODO
describe('Player Model', () => {
  it('should create a player with the correct name and ranking', () => {
    const player = new Player('John Doe', 1);
    expect(player.name).toBe('John Doe');
    expect(player.ranking).toBe(1);
  });

  it('should calculate the correct ranking group', () => {
    const player = new Player('Jane Doe', 150);
    expect(player.group).toBe(RankingGroup.SECOND_CATEGORY_A);
  });
});
