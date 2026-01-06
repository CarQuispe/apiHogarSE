// src/modules/ninios/infrastructure/ninios.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { CreateNinioUseCase } from '../application/create-ninio.use-case';
import { UpdateNinioUseCase } from '../application/update-ninio.use-case';
import { DeleteNinioUseCase } from '../application/delete-ninio.use-case';
import { GetNinioByIdUseCase } from '../application/get-ninio-by-id.use-case';
import { SearchNiniosUseCase } from '../application/search-ninios.use-case';

@Controller('ninios')
export class NiniosController {
  constructor(
    private readonly createUC: CreateNinioUseCase,
    private readonly updateUC: UpdateNinioUseCase,
    private readonly deleteUC: DeleteNinioUseCase,
    private readonly getByIdUC: GetNinioByIdUseCase,
    private readonly searchUC: SearchNiniosUseCase,
  ) {}

  @Post()
  create(@Body() dto: any) {
    return this.createUC.execute(dto);
  }

  @Get()
  search(@Query() query: any) {
    return this.searchUC.execute(query);
  }

  @Get(':id')
  get(@Param('id') id: number) {
    return this.getByIdUC.execute(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: any) {
    return this.updateUC.execute(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.deleteUC.execute(+id);
  }
}

