import { Repository } from 'typeorm';
import { NinioRepository } from '../domain/ninio.repository';
import { Ninio } from '../domain/ninio.entity';
import { NinioOrmEntity } from './typeorm-ninio.entity';
export declare class TypeormNiniosRepository implements NinioRepository {
    private readonly repo;
    constructor(repo: Repository<NinioOrmEntity>);
    private toDomain;
    private toOrm;
    create(ninio: Ninio): Promise<Ninio>;
    update(id: number, data: Partial<Ninio>): Promise<Ninio>;
    delete(id: number): Promise<void>;
    findById(id: number): Promise<Ninio | null>;
    search(filters: any): Promise<Ninio[]>;
}
