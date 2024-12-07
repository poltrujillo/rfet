import { RankingGroup } from '@/constants/ranking';
import { Player } from '@/models/player';

export const groupPointsMap: Record<RankingGroup, number> = {
  [RankingGroup.FIRST_CATEGORY]: 200,
  [RankingGroup.SECOND_CATEGORY_A]: 175,
  [RankingGroup.SECOND_CATEGORY_B]: 150,
  [RankingGroup.GROUP_10]: 10,
  [RankingGroup.GROUP_9]: 9,
  [RankingGroup.GROUP_8]: 8,
  [RankingGroup.GROUP_7]: 7,
  [RankingGroup.GROUP_6]: 6,
  [RankingGroup.GROUP_5]: 5,
  [RankingGroup.GROUP_4]: 4,
  [RankingGroup.GROUP_3]: 3,
  [RankingGroup.GROUP_2]: 2,
  [RankingGroup.GROUP_1]: 1,
};

export function getRankingPoints(ranking: number): number | null {
  if (ranking >= 1 && ranking <= 5) return 200;
  if (ranking >= 6 && ranking <= 10) return 175;
  if (ranking >= 11 && ranking <= 15) return 150;
  if (ranking >= 16 && ranking <= 20) return 125;
  if (ranking >= 21 && ranking <= 25) return 100;
  if (ranking >= 26 && ranking <= 50) return 75;
  if (ranking >= 51 && ranking <= 75) return 50;
  if (ranking >= 76 && ranking <= 100) return 40;
  if (ranking >= 101 && ranking <= 200) return 30;
  if (ranking >= 201 && ranking <= 300) return 20;
  return null;
}

export function awardVictoryPoints(loser: Player): number {
  const rankingPoints = getRankingPoints(loser.ranking);
  if (rankingPoints !== null) {
    return rankingPoints;
  }

  const groupPoints = groupPointsMap[loser.group];
  if (groupPoints !== undefined) {
    return groupPoints;
  }

  throw new Error('Invalid ranking or group for points calculation');
}
