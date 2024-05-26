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
import { RepositoriesService } from './../services/repositories.service';
import { MetricsService } from './../services/metrics.service';
import { ApiTags } from '@nestjs/swagger';
import { RepositoryDTO, RepositoryUpdateDTO } from '../dto/repositoryDTO';
import { EntityMapper } from '@utils/mapper/entityMapper.service';
import { Repository } from './../entities/repository.entity';
import { ErrorsMessages } from '@utils/constants/errorMessages';

@ApiTags('Repositories')
@Controller('api/repositories')
export class RepositoriesController {
  constructor(
    private repositoriesService: RepositoriesService,
    private metricsService: MetricsService,
  ) {}

  @Get()
  findAll() {
    return this.repositoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.repositoriesService.findOne(+id);
  }

  @Post()
  create(@Body() repositoryDTO: RepositoryDTO): Promise<any> {
    try {
      return this.repositoriesService.create(
        EntityMapper.mapTo(Repository, repositoryDTO),
      );
    } catch (error: any) {
      throw new BadRequestException(
        error.detail ?? error.message ?? ErrorsMessages.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() repositoryUpdateDTO: RepositoryUpdateDTO,
  ): Promise<any> {
    const repository: Repository = EntityMapper.mapTo(
      Repository,
      repositoryUpdateDTO,
    );
    return this.repositoriesService.update({ id, repository });
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<any> {
    return this.repositoriesService.remove(id);
  }

  @Get('tribe/:id')
  async findMetricsRepositoriesByTribe(@Param('id') id: number) {
    const responseMetricsRepositoriesByTribe =
      await this.metricsService.findRepositoriesByTribe(id);

    return responseMetricsRepositoriesByTribe;
  }
}
