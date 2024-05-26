import { Tribe } from '../entities/tribe.entity';

export interface IEditTribeInput {
  id: number;
  tribe: Tribe;
}
