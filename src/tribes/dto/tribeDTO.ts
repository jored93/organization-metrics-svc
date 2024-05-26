import {
  IsString,
  IsNumber,
  MaxLength,
  MinLength,
  IsOptional,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class TribeDTO {
  @IsString()
  @MinLength(10)
  @MaxLength(50)
  @ApiProperty()
  name!: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  status: number;

  @IsNumber()
  @ApiProperty()
  id_organization!: number;
}

export class TribeUpdateDTO extends PartialType(TribeDTO) {}
