import { NinioRepository } from '../domain/ninio.repository';
import { Ninio } from '../domain/ninio.entity';
export declare class UpdateNinioUseCase {
    private readonly repository;
    constructor(repository: NinioRepository);
    execute(id: number, data: Partial<Ninio>): Promise<Ninio>;
}
