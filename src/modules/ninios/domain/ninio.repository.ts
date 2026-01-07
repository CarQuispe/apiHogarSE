// src/modules/ninios/domain/ninio.repository.ts
import { Ninio } from './ninio.entity';
import { NinioStatus } from './ninio-status.enum';

export interface NinioFilters {
  search?: string;
  estado?: NinioStatus | string;
  sexo?: string;
  ci?: string;
  nacionalidad?: string;
  fecha_ingreso_desde?: Date;
  fecha_ingreso_hasta?: Date;
  fecha_nacimiento_desde?: Date;
  fecha_nacimiento_hasta?: Date;
  limit?: number;
  offset?: number;
}

export abstract class NinioRepository {
  // Métodos CRUD
  abstract create(ninio: Ninio): Promise<Ninio>;
  abstract findByCi(ci: string): Promise<Ninio | null>;
  abstract update(id: number, data: Partial<Ninio>): Promise<Ninio>;
  abstract delete(id: number): Promise<void>;
  abstract findById(id: number): Promise<Ninio | null>;
  
  // Métodos de consulta
  abstract findAll(): Promise<Ninio[]>;
  abstract search(filters: NinioFilters): Promise<Ninio[]>;
  
  // Métodos adicionales útiles
  abstract count(filters?: NinioFilters): Promise<number>;
  abstract existsByCi(ci: string): Promise<boolean>;
}