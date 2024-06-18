import { PartialType } from '@nestjs/mapped-types';
import { CreateUnityDto } from './create-unity.dto';
import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUnityDto extends PartialType(CreateUnityDto) {
  @IsNumber({}, { message: 'O id não pode ser vazio.' })
  @Type(() => Number)
  readonly ind: bigint;
}
