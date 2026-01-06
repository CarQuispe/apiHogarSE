import { NinioRepository } from '../domain/ninio.repository';
import { NinioFilters } from '../domain/ninio-filters.interface';
export declare class SearchNiniosUseCase {
    private readonly repository;
    constructor(repository: NinioRepository);
    execute(filters: NinioFilters): Promise<import("../domain/ninio.entity").Ninio[]>;
}
