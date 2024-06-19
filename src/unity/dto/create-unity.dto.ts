import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUnityDto {
  @ApiProperty({ description: 'Nome do tipo da unidade' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  @IsString({ message: 'O Nome não pode ser vazio.' })
  name: string;
}
