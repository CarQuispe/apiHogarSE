import { NinioStatus } from './ninio-status.enum';
export declare class Ninio {
    readonly id: number;
    readonly ci: string;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string | null;
    sexo: string | null;
    nacionalidad: string | null;
    etnia: string | null;
    fechaNacimiento: Date;
    fechaIngreso: Date;
    estado: NinioStatus;
    observacionesIngreso?: string | undefined;
    fechaEgreso?: Date | undefined;
    motivoEgreso?: string | undefined;
    fechaCreacion?: Date | undefined;
    fechaActualizacion?: Date | undefined;
    constructor(id: number, ci: string, nombre: string, apellidoPaterno: string, apellidoMaterno: string | null, sexo: string | null, nacionalidad: string | null, etnia: string | null, fechaNacimiento: Date, fechaIngreso: Date, estado: NinioStatus, observacionesIngreso?: string | undefined, fechaEgreso?: Date | undefined, motivoEgreso?: string | undefined, fechaCreacion?: Date | undefined, fechaActualizacion?: Date | undefined);
}
