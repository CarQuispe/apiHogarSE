// src/modules/ninios/infrastructure/update-ninio.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateNinioDto } from './create-ninio.dto';

export class UpdateNinioDto extends PartialType(CreateNinioDto) {}
