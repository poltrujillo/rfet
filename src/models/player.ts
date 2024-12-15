import { RankingGroup } from '@/constants/ranking';
import { v4 as uuidv4 } from 'uuid';
import { Competitor } from './competitor';

export class Player extends Competitor {
  public _id: string;
  private _name: string;
  private _ranking: number;
  private _group: RankingGroup;

  public constructor(name: string, ranking: number) {
    super();
    this._id = uuidv4();
    this._name = name;
    this._ranking = ranking;
    this._group = this.calculateGroup();
  }

  private calculateGroup(): RankingGroup {
    const ranking = this._ranking;

    if (ranking >= 1 && ranking <= 50) {
      return RankingGroup.FIRST_CATEGORY;
    } else if (ranking >= 51 && ranking <= 150) {
      return RankingGroup.SECOND_CATEGORY_A;
    } else if (ranking >= 151 && ranking <= 300) {
      return RankingGroup.SECOND_CATEGORY_B;
    } else if (ranking >= 301 && ranking <= 500) {
      return RankingGroup.GROUP_10;
    } else if (ranking >= 501 && ranking <= 1000) {
      return RankingGroup.GROUP_9;
    } else if (ranking >= 1001 && ranking <= 2000) {
      return RankingGroup.GROUP_8;
    } else if (ranking >= 2001 && ranking <= 4000) {
      return RankingGroup.GROUP_7;
    } else if (ranking >= 4001 && ranking <= 7000) {
      return RankingGroup.GROUP_6;
    } else if (ranking >= 7001 && ranking <= 11000) {
      return RankingGroup.GROUP_5;
    } else if (ranking >= 11001 && ranking <= 13453) {
      return RankingGroup.GROUP_4;
    } else if (ranking === 14149) {
      return RankingGroup.GROUP_3;
    } else if (ranking === 14902) {
      return RankingGroup.GROUP_2;
    } else if (ranking === 16491) {
      return RankingGroup.GROUP_1;
    }

    throw new Error('Invalid ranking value for group calculation');
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get ranking(): number {
    return this._ranking;
  }

  public get group(): RankingGroup {
    return this._group;
  }
}
