import { IsNumber } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class MetricDTO {
  @IsNumber()
  @ApiProperty()
  coverage!: number;

  @IsNumber()
  @ApiProperty()
  bugs!: number;

  @IsNumber()
  @ApiProperty()
  vulnerabilities!: number;

  @IsNumber()
  @ApiProperty()
  hotspot!: number;

  @IsNumber()
  @ApiProperty()
  code_smells!: number;

  @IsNumber()
  @ApiProperty()
  id_repository!: number;
}

export class MetricUpdateDTO extends PartialType(MetricDTO) {}
