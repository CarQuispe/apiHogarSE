// src/modules/ninios/application/create-ninio.use-case.ts
import { Injectable } from '@nestjs/common';
import { NinioRepository } from '../domain/ninio.repository';
import { Ninio } from '../domain/ninio.entity';
import { NinioStatus } from '../domain/ninio-status.enum';

@Injectable()
export class CreateNinioUseCase {
  constructor(private readonly repository: NinioRepository) {}

  execute(data: Omit<Ninio, 'id'>): Promise<Ninio> {
    const ninio = new Ninio(
      0,
      data.ci,
      data.nombre,
      data.apellidoPaterno,
      data.apellidoMaterno,
      data.sexo,
      data.nacionalidad,
      data.etnia,
      data.fechaNacimiento,
      data.fechaIngreso ?? new Date(),
      data.estado ?? NinioStatus.ACTIVO,
      data.observacionesIngreso,
    );

    return this.repository.create(ninio);
  }
}
