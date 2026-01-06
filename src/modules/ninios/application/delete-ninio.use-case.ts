// src/modules/ninios/application/delete-ninio.use-case.ts
import { Injectable } from '@nestjs/common';
import { NinioRepository } from '../domain/ninio.repository';

@Injectable()
export class DeleteNinioUseCase {
  constructor(private readonly repository: NinioRepository) {}

  execute(id: number): Promise<void> {
    return this.repository.delete(id);
  }
}
