import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Metric } from './../entities/metric.entity';
import { IEditMetricInput } from '../interfaces/metric.interface';
import { RepositoriesService } from '@src/repositories/services/repositories.service';
import { MetricDTO } from '../dto/metricDTO';

@Injectable()
export class MetricsService {
  private readonly logger = new Logger(MetricsService.name);
  constructor(
    private repositoriesService: RepositoriesService,
    @InjectRepository(Metric)
    private metricRepo: Repository<Metric>,
  ) {}

  async findAll(): Promise<Metric[] | any> {
    const metrics = this.metricRepo.find({
      relations: ['repository'],
    });
    if (!metrics) {
      this.logger.debug(`No metrics found`);
      throw new NotFoundException(`No metrics found`);
    }
    if ((await metrics).length === 0) {
      return {
        message: 'No metrics found',
      };
    }
    return metrics;
  }

  findOne(id: number): Promise<Metric | null> {
    const entity = this.metricRepo.findOne({
      where: { id_metric: id },
      relations: ['repository'],
    });

    if (!entity) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }

    return entity;
  }

  async create(metricDto: MetricDTO) {
    try {
      const repository = await this.repositoriesService.findOne(
        metricDto.id_repository,
      );
      if (!repository) {
        throw new Error('Repository not found');
      }

      const metric = new Metric();
      metric.repository = repository;
      metric.coverage = metricDto.coverage;
      metric.bugs = metricDto.bugs;
      metric.vulnerabilities = metricDto.vulnerabilities;
      metric.hotspot = metricDto.hotspot;
      metric.code_smells = metricDto.code_smells;

      return this.metricRepo.save(metric);
    } catch (error: any) {
      throw new BadRequestException(`${error.message}`);
    }
  }

  async update(input: IEditMetricInput): Promise<Metric> {
    const { id, metric } = input;
    const existingMetric = await this.metricRepo.findOne({
      where: { id_metric: id },
    });

    if (!existingMetric) {
      throw new NotFoundException(`Metric with id ${id} not found`);
    }

    await this.metricRepo.update(id, metric);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const existingMetric = await this.metricRepo.findOne({
      where: { id_metric: id },
    });

    if (!existingMetric) {
      throw new NotFoundException(`Metric with id ${id} not found`);
    }

    await this.metricRepo.delete(id);
  }
}
