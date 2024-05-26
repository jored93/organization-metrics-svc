import {
  IsString,
  IsNumber,
  MaxLength,
  MinLength,
  IsOptional,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class OrganizationDTO {
  @IsString()
  @MinLength(10)
  @MaxLength(50)
  @ApiProperty()
  name!: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  status: number;
}

export class OrganizationUpdateDTO extends PartialType(OrganizationDTO) {}
