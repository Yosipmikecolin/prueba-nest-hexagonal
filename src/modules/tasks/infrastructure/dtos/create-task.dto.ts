import {
  IsUUID,
  IsDateString,
  IsString,
  MinLength,
  Validate,
} from 'class-validator';
import { IsFutureDate } from '../validators/future-date.validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Sacar al perro',
    description: 'Título único de la tarea',
  })
  @IsString()
  @MinLength(10)
  title: string;

  @ApiProperty({
    example: 'Llevar a Firulais al parque',
    description: 'Descripción detallada',
  })
  @IsString()
  @MinLength(5)
  description: string;

  @ApiProperty({
    example: '2025-09-12',
    description: 'Fecha de vencimiento (debe ser futura)',
  })
  @IsDateString()
  @Validate(IsFutureDate)
  dueDate: Date;

  @ApiProperty({
    example: '0ae642f7-12ad-4fdc-8837-da7eadae48ad',
    description: 'ID del usuario dueño de la tarea',
  })
  @IsUUID()
  userId: string;
}
