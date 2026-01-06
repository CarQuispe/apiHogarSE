// src/modules/ninios/infrastructure/typeorm-ninios.repository.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NinioRepository } from '../domain/ninio.repository';
import { Ninio } from '../domain/ninio.entity';
import { NinioOrmEntity } from './typeorm-ninio.entity';

@Injectable()
export class TypeormNiniosRepository implements NinioRepository {
  constructor(
    @InjectRepository(NinioOrmEntity)
    private readonly repo: Repository<NinioOrmEntity>,
  ) {}

  /* =========================
     MAPPERS
     ========================= */

  private toDomain(entity: NinioOrmEntity): Ninio {
    return new Ninio(
      entity.id,
      entity.ci,
      entity.nombre,
      entity.apellidoPaterno,
      entity.apellidoMaterno ?? null,
      entity.sexo ?? null,
      entity.nacionalidad ?? null,
      entity.etnia ?? null,
      entity.fechaNacimiento,
      entity.fechaIngreso,
      entity.estado as any,
      entity.observacionesIngreso ?? undefined,
      entity.fechaEgreso ?? undefined,
      entity.motivoEgreso ?? undefined,
      entity.fechaCreacion,
      entity.fechaActualizacion,
    );
  }

  private toOrm(data: Partial<Ninio>): Partial<NinioOrmEntity> {
    return {
      nombre: data.nombre,
      apellidoPaterno: data.apellidoPaterno,
      apellidoMaterno: data.apellidoMaterno ?? undefined,
      sexo: data.sexo ?? undefined,
      nacionalidad: data.nacionalidad ?? undefined,
      etnia: data.etnia ?? undefined,
      fechaNacimiento: data.fechaNacimiento,
      fechaIngreso: data.fechaIngreso,
      estado: data.estado,
      observacionesIngreso: data.observacionesIngreso,
      fechaEgreso: data.fechaEgreso,
      motivoEgreso: data.motivoEgreso,
    };
  }

  /* =========================
     CRUD
     ========================= */

  async create(ninio: Ninio): Promise<Ninio> {
    const entity = this.repo.create({
      ...this.toOrm(ninio),
      ci: ninio.ci,
    });

    const saved = await this.repo.save(entity);
    return this.toDomain(saved);
  }

  async update(id: number, data: Partial<Ninio>): Promise<Ninio> {
    const entity = await this.repo.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException('Niño no encontrado');
    }

    Object.assign(entity, this.toOrm(data));

    const saved = await this.repo.save(entity);
    return this.toDomain(saved);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async findById(id: number): Promise<Ninio | null> {
    const entity = await this.repo.findOneBy({ id });
    return entity ? this.toDomain(entity) : null;
  }

  async search(filters: any): Promise<Ninio[]> {
    const qb = this.repo.createQueryBuilder('n');

    if (filters.estado) {
      qb.andWhere('n.estado = :estado', { estado: filters.estado });
    }

    if (filters.nombre) {
      qb.andWhere('n.nombre ILIKE :nombre', {
        nombre: `%${filters.nombre}%`,
      });
    }

    if (filters.ci) {
      qb.andWhere('n.ci = :ci', { ci: filters.ci });
    }

    const result = await qb.getMany();
    return result.map((entity) => this.toDomain(entity));
  }
}
