// src/modules/ninios/infrastructure/update-ninio.dto.ts
// src/modules/ninios/infrastructure/update-ninio.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateNinioDto } from './create-ninio.dto';
import { 
  IsString, 
  IsOptional, 
  MinLength, 
  MaxLength,
  ValidateIf 
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateNinioDto extends PartialType(CreateNinioDto) {
  @ApiPropertyOptional({
    description: 'Cédula de Identidad del niño',
    example: '1234567',
    minLength: 5,
    maxLength: 12
  })
  @IsString()
  @IsOptional()
  @MinLength(5, { message: 'El CI debe tener al menos 5 dígitos' })
  @MaxLength(12, { message: 'El CI no puede tener más de 12 dígitos' })
  @ValidateIf((o) => o.ci !== undefined)
  ci?: string;

  @ApiPropertyOptional({
    description: 'Nombre del niño',
    example: 'Juan Carlos'
  })
  @IsString()
  @IsOptional()
  nombre?: string;

  @ApiPropertyOptional({
    description: 'Apellido paterno',
    example: 'Pérez'
  })
  @IsString()
  @IsOptional()
  apellido_paterno?: string;

  @ApiPropertyOptional({
    description: 'Apellido materno',
    example: 'Gómez'
  })
  @IsString()
  @IsOptional()
  apellido_materno?: string;

  @ApiPropertyOptional({
    description: 'Fecha de nacimiento (YYYY-MM-DD)',
    example: '2010-05-15'
  })
  @IsString()
  @IsOptional()
  fecha_nacimiento?: string;

  // Validación adicional: Si se envía fecha_egreso, debe venir con motivo_egreso
  @ApiPropertyOptional({
    description: 'Fecha de egreso (si aplica)',
    example: '2024-12-31'
  })
  @IsString()
  @IsOptional()
  fecha_egreso?: string;

  @ApiPropertyOptional({
    description: 'Motivo del egreso',
    example: 'Reunificación familiar'
  })
  @IsString()
  @IsOptional()
  @ValidateIf((o) => o.fecha_egreso !== undefined)
  motivo_egreso?: string;

  @ApiPropertyOptional({
    description: 'Estado del niño',
    example: 'egresado'
  })
  @IsString()
  @IsOptional()
  estado?: string;
}