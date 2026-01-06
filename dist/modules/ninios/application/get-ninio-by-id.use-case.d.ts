import { NinioRepository } from '../domain/ninio.repository';
export declare class GetNinioByIdUseCase {
    private readonly repository;
    constructor(repository: NinioRepository);
    execute(id: number): Promise<import("../domain/ninio.entity").Ninio>;
}
