// src/modules/ninios/domain/ninio-filters.interface.ts
import { NinioStatus } from './ninio-status.enum';

export interface NinioFilters {
  estado?: NinioStatus;
  nombre?: string;
  ci?: string;
}
