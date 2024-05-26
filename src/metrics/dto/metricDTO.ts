import { IsNumber, IsDecimal } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class MetricDTO {
  @IsDecimal()
  @ApiProperty()
  coverage!: string;

  @IsNumber()
  @ApiProperty()
  bugs!: string;

  @IsNumber()
  @ApiProperty()
  vulnerabilities!: string;

  @IsNumber()
  @ApiProperty()
  hotspot!: string;

  @IsNumber()
  @ApiProperty()
  code_smells!: string;

  @IsNumber()
  @ApiProperty()
  id_repository!: number;
}

export class MetricUpdateDTO extends PartialType(MetricDTO) {}
