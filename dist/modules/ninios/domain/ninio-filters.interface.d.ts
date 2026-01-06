import { NinioStatus } from './ninio-status.enum';
export interface NinioFilters {
    estado?: NinioStatus;
    nombre?: string;
    ci?: string;
}
