// src/modules/ninios/domain/ninio.entity.ts
// backend/src/modules/ninios/domain/ninio.entity.ts
import { NinioStatus } from './ninio-status.enum';

export class Ninio {
  constructor(
    public readonly id: number,
    public readonly ci: string,
    public nombre: string,
    public apellido_paterno: string, // Cambiado a snake_case
    public apellido_materno: string | null, // Cambiado a snake_case
    public sexo: string | null,
    public nacionalidad: string | null,
    public etnia: string | null,
    public fecha_nacimiento: Date, // Cambiado a snake_case
    public fecha_ingreso: Date, // Cambiado a snake_case
    public estado: NinioStatus,
    public observaciones_ingreso?: string, // Cambiado a snake_case
    public fecha_egreso?: Date, // Cambiado a snake_case
    public motivo_egreso?: string, // Cambiado a snake_case
    public fecha_creacion?: Date, // Cambiado a snake_case
    public fecha_actualizacion?: Date, // Cambiado a snake_case
  ) {}
}