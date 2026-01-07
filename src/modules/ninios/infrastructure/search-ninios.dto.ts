// src/modules/ninios/infrastructure/search-ninios.dto.ts
import { IsString, IsOptional, IsIn } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { NinioStatus } from '../domain/ninio-status.enum';

export class SearchNiniosDto {
  @ApiPropertyOptional({
    description: 'Texto para buscar en nombre o apellidos',
    example: 'Juan'
  })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({
    description: 'Estado del niño',
    example: NinioStatus.ACTIVO,
    enum: Object.values(NinioStatus)
  })
  @IsString()
  @IsOptional()
  @IsIn(Object.values(NinioStatus), {
    message: `El estado debe ser uno de: ${Object.values(NinioStatus).join(', ')}`
  })
  estado?: string;

  @ApiPropertyOptional({
    description: 'Sexo del niño',
    example: 'masculino'
  })
  @IsString()
  @IsOptional()
  sexo?: string;

  @ApiPropertyOptional({
    description: 'CI específico',
    example: '1234567'
  })
  @IsString()
  @IsOptional()
  ci?: string;

  @ApiPropertyOptional({
    description: 'Nacionalidad',
    example: 'Boliviana'
  })
  @IsString()
  @IsOptional()
  nacionalidad?: string;
}