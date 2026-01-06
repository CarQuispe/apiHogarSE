// src/modules/ninios/domain/ninio.entity.ts
import { NinioStatus } from './ninio-status.enum';

export class Ninio {
  constructor(
    public readonly id: number,
    public readonly ci: string,
    public nombre: string,
    public apellidoPaterno: string,
    public apellidoMaterno: string | null,
    public sexo: string | null,
    public nacionalidad: string | null,
    public etnia: string | null,
    public fechaNacimiento: Date,
    public fechaIngreso: Date,
    public estado: NinioStatus,
    public observacionesIngreso?: string,
    public fechaEgreso?: Date,
    public motivoEgreso?: string,
    public fechaCreacion?: Date,
    public fechaActualizacion?: Date,
  ) {}
}
