export declare class NinioOrmEntity {
    id: number;
    ci: string;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno?: string;
    sexo?: string;
    nacionalidad?: string;
    etnia?: string;
    fechaNacimiento: Date;
    fechaIngreso: Date;
    estado: string;
    observacionesIngreso?: string;
    fechaEgreso?: Date;
    motivoEgreso?: string;
    fechaCreacion: Date;
    fechaActualizacion: Date;
}
