import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import moment from 'moment';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Repository as RepositoryEntity } from './../entities/repository.entity';
import { Metric } from '@src/metrics/entities/metric.entity';
import { IEditRepositoryInput } from '../interfaces/repository.interface';

@Injectable()
export class RepositoriesService {
  private readonly logger = new Logger(RepositoriesService.name);
  constructor(
    @InjectRepository(RepositoryEntity)
    private repositoryRepo: Repository<RepositoryEntity>,
    @InjectRepository(RepositoryEntity)
    private metricRepo: Repository<Metric>,
  ) {}
  async findAll(): Promise<RepositoryEntity[] | any> {
    const repositories = this.repositoryRepo.find({
      relations: ['tribe'],
    });
    if (!repositories) {
      this.logger.debug(`No repositories found`);
      throw new NotFoundException(`No repositories found`);
    }

    if ((await repositories).length === 0) {
      return {
        message: 'No repositories found',
      };
    }
    return repositories;
  }

  findOne(id: number): Promise<RepositoryEntity | null> {
    const entity = this.repositoryRepo.findOne({
      where: { id_repository: id },
      relations: ['tribe'],
    });

    if (!entity) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }

    return entity;
  }

  async create(repository: RepositoryEntity): Promise<RepositoryEntity> {
    const repositoryExist = await this.repositoryRepo.findOne({
      where: { name: repository.name, status: 'A' },
    });
    if (repositoryExist) {
      this.logger.debug(`Repository: ${repository.name} exists already`);
      throw new ConflictException(
        `Repository: ${repository.name} exists already`,
      );
    }
    return this.repositoryRepo.save(repository);
  }

  async update(input: IEditRepositoryInput): Promise<RepositoryEntity> {
    const { id, repository } = input;
    const existingRepository = await this.repositoryRepo.findOne({
      where: { id_repository: id },
    });

    if (!existingRepository) {
      throw new NotFoundException(`Repository with id ${id} not found`);
    }

    await this.repositoryRepo.update(id, repository);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const existingRepository = await this.repositoryRepo.findOne({
      where: { id_repository: id },
    });

    if (!existingRepository) {
      throw new NotFoundException(`Repository with id ${id} not found`);
    }

    await this.repositoryRepo.delete(id);
  }

  async findRepositoriesByTribe(id: number) {
    const currentDate = moment().year() + '-01-01  00:00:00.000';
    const metricsRepositoriesByTribe: Metric[] = await this.metricRepo
      .createQueryBuilder('metric')
      .innerJoinAndSelect('metric.repository', 'repository')
      .innerJoinAndSelect('repository.tribe', 'tribe')
      .innerJoinAndSelect('tribe.organization', 'organization')
      .where('tribe.id_tribe=:id', { id: +id })
      .andWhere('repository.status=:status', { status: 'A' })
      .andWhere('repository.create_time >= :create_time', {
        create_time: currentDate,
      })
      .getMany();

    if (metricsRepositoriesByTribe.length < 1) {
      throw new NotFoundException('The Tribe is not registered');
    }

    const withCoverage_metricsRepositoriesByTribe =
      metricsRepositoriesByTribe.filter((metric) => metric.coverage > 75);

    if (withCoverage_metricsRepositoriesByTribe.length < 1) {
      throw new NotFoundException(
        'The Tribe does not have repositories that meet the minimum coverage of 75 pts',
      );
    }

    return withCoverage_metricsRepositoriesByTribe;
  }
}
