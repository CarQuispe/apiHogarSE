// src/modules/ninios/application/get-ninio-by-id.use-case.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { NinioRepository } from '../domain/ninio.repository';

@Injectable()
export class GetNinioByIdUseCase {
  constructor(private readonly repository: NinioRepository) {}

  async execute(id: number) {
    const ninio = await this.repository.findById(id);
    if (!ninio) throw new NotFoundException('Niño no encontrado');
    return ninio;
  }
}
