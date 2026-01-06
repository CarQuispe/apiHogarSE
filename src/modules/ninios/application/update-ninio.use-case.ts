// src/modules/ninios/application/update-ninio.use-case.ts
import { Injectable } from '@nestjs/common';
import { NinioRepository } from '../domain/ninio.repository';
import { Ninio } from '../domain/ninio.entity';

@Injectable()
export class UpdateNinioUseCase {
  constructor(private readonly repository: NinioRepository) {}

  execute(id: number, data: Partial<Ninio>): Promise<Ninio> {
    return this.repository.update(id, data);
  }
}
