import { Repository } from '../entities/repository.entity';

export interface IEditRepositoryInput {
  id: number;
  repository: Repository;
}
