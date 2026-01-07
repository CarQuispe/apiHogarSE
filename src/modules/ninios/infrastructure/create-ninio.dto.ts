// src/modules/ninios/infrastructure/create-ninio.dto.ts
import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateNinioDto {
  @IsString()
  @IsNotEmpty()
  ci: string;

  @IsString()
  nombre: string;

  @IsString()
  apellido_Paterno: string;

  @IsDateString()
  fecha_Nacimiento: string;
}
