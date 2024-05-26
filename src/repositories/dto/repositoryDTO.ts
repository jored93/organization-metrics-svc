import {
  IsString,
  MaxLength,
  MinLength,
  IsNumber,
  IsIn,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class RepositoryDTO {
  @IsString()
  @MinLength(10)
  @MaxLength(50)
  @ApiProperty()
  name!: string;

  @IsString()
  @IsIn(['E', 'D', 'A'])
  @ApiProperty({
    enum: ['E', 'D', 'A'],
    description: 'State can be E, D, or A',
  })
  state!: 'E' | 'D' | 'A';

  @IsString()
  @IsIn(['A', 'I'])
  @ApiProperty({ enum: ['A', 'I'], description: 'Status can be A or I' })
  status!: 'A' | 'I';

  @IsNumber()
  @ApiProperty()
  id_tribe!: number;
}

export class RepositoryUpdateDTO extends PartialType(RepositoryDTO) {}
