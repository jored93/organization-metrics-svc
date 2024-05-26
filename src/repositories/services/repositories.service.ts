import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Repository as RepositoryEntity } from './../entities/repository.entity';
import { IEditRepositoryInput } from '../interfaces/repository.interface';

@Injectable()
export class RepositoriesService {
  constructor(
    @InjectRepository(RepositoryEntity)
    private repositoryRepo: Repository<RepositoryEntity>,
  ) {}
  findAll() {
    return this.repositoryRepo.find();
  }

  findOne(id: number) {
    return this.repositoryRepo.findByIds([id]);
  }

  create(repository: RepositoryEntity) {
    return this.repositoryRepo.save(repository);
  }

  async update(input: IEditRepositoryInput) {
    const { id, repository } = input;
    await this.repositoryRepo.update(id, repository);
    return this.repositoryRepo.findByIds([id]);
  }

  async remove(id: number) {
    await this.repositoryRepo.delete(id);
    return {
      message: `RepositoryEntity with ${id} deleted successfully`,
    };
  }
}
