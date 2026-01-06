// src/modules/ninios/application/get-ninios.use-case.ts
import { Injectable } from '@nestjs/common';
import { NinioRepository } from '../domain/ninio.repository';
import { NinioFilters } from '../domain/ninio-filters.interface';

@Injectable()
export class SearchNiniosUseCase {
  constructor(private readonly repository: NinioRepository) {}

  execute(filters: NinioFilters) {
    return this.repository.search(filters);
  }
}
