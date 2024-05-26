import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Metric } from './entities/metric.entity';
import { MetricsService } from './services/metrics.service';
import { MetricsController } from './controllers/metrics.controller';

import { RepositoriesModule } from '@src/repositories/repositories.module';

@Module({
  imports: [RepositoriesModule, TypeOrmModule.forFeature([Metric])],
  providers: [MetricsService],
  controllers: [MetricsController],
})
export class MetricsModule {}
