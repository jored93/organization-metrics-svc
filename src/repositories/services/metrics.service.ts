import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import * as moment from 'moment';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Metric } from '@src/metrics/entities/metric.entity';
@Injectable()
export class MetricsService {
  private readonly logger = new Logger(MetricsService.name);
  constructor(
    @InjectRepository(Metric)
    private metricRepo: Repository<Metric>,
  ) {}

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
