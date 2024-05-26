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
import { TribesService } from './../services/tribes.service';
import { ApiTags } from '@nestjs/swagger';
import { TribeDTO, TribeUpdateDTO } from '../dto/tribeDTO';
import { EntityMapper } from '@utils/mapper/entityMapper.service';
import { Tribe } from './../entities/tribe.entity';
import { ErrorsMessages } from '@utils/constants/errorMessages';

@ApiTags('Tribes')
@Controller('api/tribes')
export class TribesController {
  constructor(private tribesService: TribesService) {}

  @Get()
  findAll() {
    return this.tribesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tribesService.findOne(+id);
  }

  @Post()
  create(@Body() tribeDTO: TribeDTO): Promise<any> {
    try {
      return this.tribesService.create(EntityMapper.mapTo(Tribe, tribeDTO));
    } catch (error: any) {
      throw new BadRequestException(
        error.detail ?? error.message ?? ErrorsMessages.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() tribeUpdateDTO: TribeUpdateDTO,
  ): Promise<any> {
    const tribe: Tribe = EntityMapper.mapTo(Tribe, tribeUpdateDTO);
    return this.tribesService.update({ id, tribe });
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<any> {
    return this.tribesService.remove(id);
  }
}
