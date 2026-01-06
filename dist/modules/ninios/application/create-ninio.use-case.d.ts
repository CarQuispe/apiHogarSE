import { NinioRepository } from '../domain/ninio.repository';
import { Ninio } from '../domain/ninio.entity';
export declare class CreateNinioUseCase {
    private readonly repository;
    constructor(repository: NinioRepository);
    execute(data: Omit<Ninio, 'id'>): Promise<Ninio>;
}
