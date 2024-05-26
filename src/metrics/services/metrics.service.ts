import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Metric } from './../entities/metric.entity';
import { IEditMetricInput } from '../interfaces/metric.interface';

@Injectable()
export class MetricsService {
  private readonly logger = new Logger(MetricsService.name);
  constructor(
    @InjectRepository(Metric)
    private metricRepo: Repository<Metric>,
  ) {}

  async findAll(): Promise<Metric[]> {
    const repositories = this.metricRepo.find();
    if (!repositories) {
      this.logger.debug(`No repositories found`);
      throw new NotFoundException(`No repositories found`);
    }
    return repositories;
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

  async create(metric: Metric): Promise<Metric> {
    return this.metricRepo.save(metric);
  }

  async update(input: IEditMetricInput): Promise<Metric> {
    const { id, metric } = input;
    const existingMetric = await this.metricRepo.findOne({
      where: { id_metric: id },
    });

    if (!existingMetric) {
      throw new NotFoundException(`Repository with id ${id} not found`);
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
