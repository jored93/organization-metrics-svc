import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Metric } from '@src/metrics/entities/metric.entity';
import { Repository } from './entities/repository.entity';
import { RepositoriesService } from './services/repositories.service';
import { MetricsService } from './services/metrics.service';
import { RepositoriesController } from './controllers/repositories.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Repository, Metric])],
  providers: [RepositoriesService, MetricsService],
  controllers: [RepositoriesController],
  exports: [RepositoriesService],
})
export class RepositoriesModule {}
