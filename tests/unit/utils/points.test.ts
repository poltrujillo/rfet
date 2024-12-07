import { awardVictoryPoints, getRankingPoints } from '@/utils/points';
import { Player } from '@/models/player';
import { RankingGroup } from '@/constants/ranking';

describe('Points Utility', () => {
  const createPlayer = (name: string, ranking: number): Player => {
    const player = new Player(name, ranking);
    jest.spyOn(player, 'group', 'get').mockReturnValue(player.group);
    return player;
  };

  describe('getRankingPoints', () => {
    it('should return the correct points for valid ranking ranges', () => {
      expect(getRankingPoints(1)).toBe(200);
      expect(getRankingPoints(5)).toBe(200);
      expect(getRankingPoints(6)).toBe(175);
      expect(getRankingPoints(15)).toBe(150);
      expect(getRankingPoints(50)).toBe(75);
      expect(getRankingPoints(75)).toBe(50);
      expect(getRankingPoints(100)).toBe(40);
      expect(getRankingPoints(200)).toBe(30);
      expect(getRankingPoints(300)).toBe(20);
    });

    it('should return null for rankings above 300', () => {
      expect(getRankingPoints(301)).toBeNull();
      expect(getRankingPoints(1000)).toBeNull();
    });

    it('should throw no errors for unexpected inputs (e.g., negative or zero rankings)', () => {
      expect(getRankingPoints(-1)).toBeNull();
      expect(getRankingPoints(0)).toBeNull();
    });
  });

  describe('awardVictoryPoints', () => {
    it('should calculate points based on ranking for players with ranking <= 300', () => {
      const loser = createPlayer('Loser', 15);

      const points = awardVictoryPoints(loser);
      expect(points).toBe(150);
    });

    it('should calculate points based on group for players with ranking > 300', () => {
      const loser = createPlayer('Loser', 301);

      const points = awardVictoryPoints(loser);
      expect(points).toBe(10);
    });

    it('should throw an error for invalid groups', () => {
      const loser = createPlayer('Loser', 1000);

      jest
        .spyOn(loser, 'group', 'get')
        .mockReturnValue(undefined as unknown as RankingGroup);

      expect(() => awardVictoryPoints(loser)).toThrow(
        'Invalid ranking or group for points calculation'
      );
    });

    it('should prioritize ranking-based points for players <= 300', () => {
      const loser = createPlayer('Loser', 100);

      const points = awardVictoryPoints(loser);
      expect(points).toBe(40);
    });

    it('should calculate points correctly for edge cases of ranking ranges', () => {
      const edgeCaseRankings = [
        { ranking: 5, expectedPoints: 200 },
        { ranking: 10, expectedPoints: 175 },
        { ranking: 15, expectedPoints: 150 },
        { ranking: 20, expectedPoints: 125 },
        { ranking: 25, expectedPoints: 100 },
        { ranking: 50, expectedPoints: 75 },
      ];

      edgeCaseRankings.forEach(({ ranking, expectedPoints }) => {
        const loser = createPlayer('Loser', ranking);
        expect(awardVictoryPoints(loser)).toBe(expectedPoints);
      });
    });
  });
});
