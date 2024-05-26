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
import { OrganizationsService } from '../services/organizations.service';
import { ApiTags } from '@nestjs/swagger';
import { OrganizationDTO, OrganizationUpdateDTO } from '../dto/organizationDTO';
import { EntityMapper } from '@utils/mapper/entityMapper.service';
import { Organization } from './../entities/organization.entity';
import { ErrorsMessages } from '@utils/constants/errorMessages';

@ApiTags('Organizations')
@Controller('api/organizations')
export class OrganizationsController {
  constructor(private organizationsService: OrganizationsService) {}
  @Get()
  findAll() {
    return this.organizationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.organizationsService.findOne(+id);
  }

  @Post()
  create(@Body() organizationDTO: OrganizationDTO): Promise<any> {
    try {
      return this.organizationsService.create(
        EntityMapper.mapTo(Organization, organizationDTO),
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
    @Body() organizationUpdateDTO: OrganizationUpdateDTO,
  ): Promise<any> {
    const organization: Organization = EntityMapper.mapTo(
      Organization,
      organizationUpdateDTO,
    );
    return this.organizationsService.update({ id, organization });
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<any> {
    return this.organizationsService.remove(id);
  }
}
