import { PartialType } from '@nestjs/mapped-types';
import { CreateUnityDto } from './create-unity.dto';
import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUnityDto extends PartialType(CreateUnityDto) {
  @ApiProperty({ description: 'Id da unidade' })
  @IsNumber({}, { message: 'O id não pode ser vazio.' })
  @Type(() => Number)
  readonly ind: bigint;
}
