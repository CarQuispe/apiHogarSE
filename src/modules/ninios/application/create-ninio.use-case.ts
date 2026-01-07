// src/modules/ninios/application/create-ninio.use-case.ts
import { Injectable } from '@nestjs/common';
import { NinioRepository } from '../domain/ninio.repository';
import { Ninio } from '../domain/ninio.entity';
import { NinioStatus } from '../domain/ninio-status.enum';

@Injectable()
export class CreateNinioUseCase {
  constructor(private readonly repository: NinioRepository) {}

  async execute(data: {
    ci: string;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string | null;
    sexo: string | null;
    nacionalidad: string | null;
    etnia: string | null;
    fecha_nacimiento: Date;
    fecha_ingreso?: Date;
    estado?: NinioStatus;
    observaciones_ingreso?: string;
    fecha_egreso?: Date;
    motivo_egreso?: string;
  }): Promise<Ninio> {
    try {
      // 1. Verificar si ya existe un niño con el mismo CI
      const existingNinio = await this.repository.findByCi(data.ci);
      if (existingNinio) {
        throw new Error(`Ya existe un niño registrado con CI: ${data.ci}`);
      }

      // 2. Validar fechas básicas
      const today = new Date();
      if (data.fecha_nacimiento > today) {
        throw new Error('La fecha de nacimiento no puede ser en el futuro');
      }

      // 3. Establecer valores por defecto
      const fechaIngreso = data.fecha_ingreso || new Date();
      const estado = data.estado || NinioStatus.ACTIVO;
      const sexo = data.sexo || 'no especificado';
      const nacionalidad = data.nacionalidad || 'Boliviana';

      // 4. Validar reglas de negocio adicionales
      if (fechaIngreso < data.fecha_nacimiento) {
        throw new Error('La fecha de ingreso no puede ser anterior a la fecha de nacimiento');
      }

      if (data.fecha_egreso && data.fecha_egreso < fechaIngreso) {
        throw new Error('La fecha de egreso no puede ser anterior a la fecha de ingreso');
      }

      // Validar estados especiales
      if ((estado === NinioStatus.EGRESADO || estado === NinioStatus.ADOPTADO)) {
        if (!data.fecha_egreso) {
          throw new Error(`Para estado ${estado} se requiere fecha de egreso`);
        }
        if (!data.motivo_egreso) {
          throw new Error(`Para estado ${estado} se requiere motivo de egreso`);
        }
      }

      // 5. Crear entidad Ninio con snake_case
      const ninio = new Ninio(
        0, // id será generado por la base de datos
        data.ci,
        data.nombre,
        data.apellido_paterno,
        data.apellido_materno,
        sexo,
        nacionalidad,
        data.etnia || null,
        data.fecha_nacimiento,
        fechaIngreso,
        estado,
        data.observaciones_ingreso,
        data.fecha_egreso,
        data.motivo_egreso,
        new Date(), // fecha_creacion
        new Date()  // fecha_actualizacion
      );

      // 6. Guardar en el repositorio (usando 'create', no 'save')
      return await this.repository.create(ninio);

    } catch (error) {
      console.error('Error en CreateNinioUseCase:', error);
      throw error;
    }
  }
}