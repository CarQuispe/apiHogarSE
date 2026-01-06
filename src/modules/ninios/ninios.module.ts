// src/modules/ninios/ninios.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NinioOrmEntity } from './infrastructure/typeorm-ninio.entity';
import { TypeormNiniosRepository } from './infrastructure/typeorm-ninios.repository';
import { NiniosController } from './infrastructure/ninios.controller';

import { NinioRepository } from './domain/ninio.repository';

import { CreateNinioUseCase } from './application/create-ninio.use-case';
import { UpdateNinioUseCase } from './application/update-ninio.use-case';
import { DeleteNinioUseCase } from './application/delete-ninio.use-case';
import { GetNinioByIdUseCase } from './application/get-ninio-by-id.use-case';
import { SearchNiniosUseCase } from './application/search-ninios.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([NinioOrmEntity]),
  ],
  controllers: [
    NiniosController,
  ],
  providers: [
    { provide: NinioRepository, useClass: TypeormNiniosRepository },
    CreateNinioUseCase,
    UpdateNinioUseCase,
    DeleteNinioUseCase,
    GetNinioByIdUseCase,
    SearchNiniosUseCase,
  ],
})
export class NiniosModule {}
