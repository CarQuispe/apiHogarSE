import { NinioRepository } from '../domain/ninio.repository';
export declare class DeleteNinioUseCase {
    private readonly repository;
    constructor(repository: NinioRepository);
    execute(id: number): Promise<void>;
}
