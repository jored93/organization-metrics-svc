import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { MetricsService } from './../services/metrics.service';
import { ApiTags } from '@nestjs/swagger';
import { MetricDTO, MetricUpdateDTO } from '../dto/metricDTO';
import { EntityMapper } from '@utils/mapper/entityMapper.service';
import { Metric } from './../entities/metric.entity';
import { ErrorsMessages } from '@utils/constants/errorMessages';

@ApiTags('Metrics')
@Controller('api/metrics')
export class MetricsController {
  constructor(private metricsService: MetricsService) {}

  @Get()
  findAll() {
    return this.metricsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.metricsService.findOne(+id);
  }

  @Post()
  create(@Body() payload: MetricDTO): Promise<any> {
    try {
      return this.metricsService.create(payload);
    } catch (error: any) {
      throw new BadRequestException(
        error.detail ?? error.message ?? ErrorsMessages.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() metricUpdateDTO: MetricUpdateDTO,
  ): Promise<any> {
    const metric: Metric = EntityMapper.mapTo(Metric, metricUpdateDTO);
    return this.metricsService.update({ id, metric });
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<any> {
    return this.metricsService.remove(id);
  }
}
