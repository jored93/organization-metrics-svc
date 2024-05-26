import { IsString, IsNumber, MaxLength, MinLength } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class OrganizationDTO {
  @IsString()
  @MinLength(10)
  @MaxLength(50)
  @ApiProperty()
  name!: string;

  @IsNumber()
  @ApiProperty()
  status!: number;
}

export class OrganizationUpdateDTO extends PartialType(OrganizationDTO) {}
