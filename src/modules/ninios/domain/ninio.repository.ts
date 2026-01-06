// src/modules/ninios/domain/ninio.repository.ts
import { Ninio } from './ninio.entity';
import { NinioFilters } from './ninio-filters.interface';

export abstract class NinioRepository {
  abstract create(ninio: Ninio): Promise<Ninio>;
  abstract update(id: number, ninio: Partial<Ninio>): Promise<Ninio>;
  abstract delete(id: number): Promise<void>;
  abstract findById(id: number): Promise<Ninio | null>;
  abstract search(filters: NinioFilters): Promise<Ninio[]>;
}
