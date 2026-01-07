// src/modules/ninios/infrastructure/typeorm-ninios.repository.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';

import { NinioRepository, NinioFilters } from '../domain/ninio.repository';
import { Ninio } from '../domain/ninio.entity';
import { NinioOrmEntity } from './typeorm-ninio.entity';
import { NinioStatus } from '../domain/ninio-status.enum';

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
      entity.apellido_paterno,
      entity.apellido_materno ?? null,
      entity.sexo ?? null,
      entity.nacionalidad ?? null,
      entity.etnia ?? null,
      entity.fecha_nacimiento,
      entity.fecha_ingreso,
      entity.estado as NinioStatus,
      entity.observaciones_ingreso ?? undefined,
      entity.fecha_egreso ?? undefined,
      entity.motivo_egreso ?? undefined,
      entity.fecha_creacion,
      entity.fecha_actualizacion,
    );
  }

  private toOrm(data: Partial<Ninio>): Partial<NinioOrmEntity> {
    return {
      ci: data.ci,
      nombre: data.nombre,
      apellido_paterno: data.apellido_paterno,
      apellido_materno: data.apellido_materno ?? undefined,
      sexo: data.sexo ?? undefined,
      nacionalidad: data.nacionalidad ?? undefined,
      etnia: data.etnia ?? undefined,
      fecha_nacimiento: data.fecha_nacimiento,
      fecha_ingreso: data.fecha_ingreso,
      estado: data.estado,
      observaciones_ingreso: data.observaciones_ingreso,
      fecha_egreso: data.fecha_egreso,
      motivo_egreso: data.motivo_egreso,
    };
  }

  /* =========================
     MÉTODOS DE VALIDACIÓN
     ========================= */

  async existsByCi(ci: string): Promise<boolean> {
    const count = await this.repo.count({ where: { ci } });
    return count > 0;
  }

  /* =========================
     MÉTODOS CRUD
     ========================= */

  async findByCi(ci: string): Promise<Ninio | null> {
    const entity = await this.repo.findOne({ 
      where: { ci },
      relations: [] // Agrega relaciones si las necesitas
    });
    return entity ? this.toDomain(entity) : null;
  }

  async create(ninio: Ninio): Promise<Ninio> {
    // Verificar que el CI no exista
    const exists = await this.existsByCi(ninio.ci);
    if (exists) {
      throw new Error(`Ya existe un niño con CI: ${ninio.ci}`);
    }

    const entity = this.repo.create(this.toOrm(ninio));
    const saved = await this.repo.save(entity);
    return this.toDomain(saved);
  }

  async update(id: number, data: Partial<Ninio>): Promise<Ninio> {
    const entity = await this.repo.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException(`Niño con ID ${id} no encontrado`);
    }

    // Si se está actualizando el CI, verificar que no exista otro con el mismo CI
    if (data.ci && data.ci !== entity.ci) {
      const exists = await this.existsByCi(data.ci);
      if (exists) {
        throw new Error(`Ya existe otro niño con CI: ${data.ci}`);
      }
    }

    const updates = this.toOrm(data);
    Object.assign(entity, updates);

    const saved = await this.repo.save(entity);
    return this.toDomain(saved);
  }

  async delete(id: number): Promise<void> {
    const result = await this.repo.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Niño con ID ${id} no encontrado`);
    }
  }

  async findById(id: number): Promise<Ninio | null> {
    const entity = await this.repo.findOne({ 
      where: { id },
      relations: [] // Agrega relaciones si las necesitas
    });
    return entity ? this.toDomain(entity) : null;
  }

  /* =========================
     MÉTODOS DE CONSULTA
     ========================= */

  async findAll(): Promise<Ninio[]> {
    const entities = await this.repo.find({
      order: { fecha_ingreso: 'DESC' }
    });
    return entities.map(entity => this.toDomain(entity));
  }

  async search(filters: NinioFilters): Promise<Ninio[]> {
    const queryBuilder = this.buildSearchQuery(filters);
    
    // Aplicar ordenamiento
    queryBuilder.orderBy('n.fecha_ingreso', 'DESC');
    
    // Aplicar paginación
    if (filters.limit) {
      queryBuilder.take(filters.limit);
    }
    
    if (filters.offset) {
      queryBuilder.skip(filters.offset);
    }

    const entities = await queryBuilder.getMany();
    return entities.map(entity => this.toDomain(entity));
  }

  async count(filters: NinioFilters = {}): Promise<number> {
    const queryBuilder = this.buildSearchQuery(filters);
    return await queryBuilder.getCount();
  }

  /* =========================
     MÉTODOS AUXILIARES
     ========================= */

  private buildSearchQuery(filters: NinioFilters) {
    const queryBuilder = this.repo.createQueryBuilder('n');

    // Filtros básicos
    if (filters.estado) {
      queryBuilder.andWhere('n.estado = :estado', { estado: filters.estado });
    }

    if (filters.sexo) {
      queryBuilder.andWhere('n.sexo = :sexo', { sexo: filters.sexo });
    }

    if (filters.ci) {
      queryBuilder.andWhere('n.ci = :ci', { ci: filters.ci });
    }

    if (filters.nacionalidad) {
      queryBuilder.andWhere('n.nacionalidad = :nacionalidad', { nacionalidad: filters.nacionalidad });
    }

    // Búsqueda por texto
    if (filters.search) {
      queryBuilder.andWhere(
        '(n.nombre ILIKE :search OR n.apellido_paterno ILIKE :search OR n.apellido_materno ILIKE :search OR n.ci ILIKE :search)',
        { search: `%${filters.search}%` }
      );
    }

    // Filtros de fechas
    if (filters.fecha_ingreso_desde || filters.fecha_ingreso_hasta) {
      if (filters.fecha_ingreso_desde && filters.fecha_ingreso_hasta) {
        queryBuilder.andWhere({
          fecha_ingreso: Between(filters.fecha_ingreso_desde, filters.fecha_ingreso_hasta)
        });
      } else if (filters.fecha_ingreso_desde) {
        queryBuilder.andWhere('n.fecha_ingreso >= :fecha_ingreso_desde', {
          fecha_ingreso_desde: filters.fecha_ingreso_desde
        });
      } else if (filters.fecha_ingreso_hasta) {
        queryBuilder.andWhere('n.fecha_ingreso <= :fecha_ingreso_hasta', {
          fecha_ingreso_hasta: filters.fecha_ingreso_hasta
        });
      }
    }

    if (filters.fecha_nacimiento_desde || filters.fecha_nacimiento_hasta) {
      if (filters.fecha_nacimiento_desde && filters.fecha_nacimiento_hasta) {
        queryBuilder.andWhere({
          fecha_nacimiento: Between(filters.fecha_nacimiento_desde, filters.fecha_nacimiento_hasta)
        });
      } else if (filters.fecha_nacimiento_desde) {
        queryBuilder.andWhere('n.fecha_nacimiento >= :fecha_nacimiento_desde', {
          fecha_nacimiento_desde: filters.fecha_nacimiento_desde
        });
      } else if (filters.fecha_nacimiento_hasta) {
        queryBuilder.andWhere('n.fecha_nacimiento <= :fecha_nacimiento_hasta', {
          fecha_nacimiento_hasta: filters.fecha_nacimiento_hasta
        });
      }
    }

    return queryBuilder;
  }

  /* =========================
     MÉTODOS ADICIONALES ÚTILES
     ========================= */

  async findByEstado(estado: NinioStatus): Promise<Ninio[]> {
    const entities = await this.repo.find({ 
      where: { estado },
      order: { fecha_ingreso: 'DESC' }
    });
    return entities.map(entity => this.toDomain(entity));
  }

  async countByEstado(): Promise<Record<string, number>> {
    const result = await this.repo
      .createQueryBuilder('n')
      .select('n.estado', 'estado')
      .addSelect('COUNT(*)', 'count')
      .groupBy('n.estado')
      .getRawMany();

    return result.reduce((acc, row) => {
      acc[row.estado] = parseInt(row.count, 10);
      return acc;
    }, {} as Record<string, number>);
  }

  async getEstadisticas(): Promise<{
    total: number;
    activos: number;
    egresados: number;
    adoptados: number;
  }> {
    const total = await this.count();
    const activos = await this.count({ estado: NinioStatus.ACTIVO });
    const egresados = await this.count({ estado: NinioStatus.EGRESADO });
    const adoptados = await this.count({ estado: NinioStatus.ADOPTADO });

    return {
      total,
      activos,
      egresados,
      adoptados
    };
  }
}