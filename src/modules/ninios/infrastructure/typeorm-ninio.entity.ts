// src/modules/ninios/infrastructure/typeorm-ninio.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('ninios')
export class NinioOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  ci: string;

  @Column()
  nombre: string;

  @Column({ name: 'apellido_paterno' })
  apellidoPaterno: string;

  @Column({ name: 'apellido_materno', nullable: true })
  apellidoMaterno?: string;

  @Column({ nullable: true })
  sexo?: string;

  @Column({ nullable: true })
  nacionalidad?: string;

  @Column({ nullable: true })
  etnia?: string;

  @Column({ name: 'fecha_nacimiento', type: 'date' })
  fechaNacimiento: Date;

  @Column({ name: 'fecha_ingreso', type: 'date' })
  fechaIngreso: Date;

  @Column()
  estado: string;

  @Column({ name: 'observaciones_ingreso', type: 'text', nullable: true })
  observacionesIngreso?: string;  // ✅ CORREGIDO

  @Column({ name: 'fecha_egreso', type: 'date', nullable: true })
  fechaEgreso?: Date;

  @Column({ name: 'motivo_egreso', type: 'text', nullable: true })
  motivoEgreso?: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_actualizacion' })
  fechaActualizacion: Date;
}