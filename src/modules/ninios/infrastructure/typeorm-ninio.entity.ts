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
  apellido_paterno: string; // Cambiado a snake_case

  @Column({ name: 'apellido_materno', nullable: true })
  apellido_materno?: string; // Cambiado a snake_case

  @Column({ nullable: true })
  sexo?: string;

  @Column({ nullable: true })
  nacionalidad?: string;

  @Column({ nullable: true })
  etnia?: string;

  @Column({ name: 'fecha_nacimiento', type: 'date' })
  fecha_nacimiento: Date; // Cambiado a snake_case

  @Column({ name: 'fecha_ingreso', type: 'date' })
  fecha_ingreso: Date; // Cambiado a snake_case

  @Column()
  estado: string;

  @Column({ name: 'observaciones_ingreso', type: 'text', nullable: true })
  observaciones_ingreso?: string; // Cambiado a snake_case

  @Column({ name: 'fecha_egreso', type: 'date', nullable: true })
  fecha_egreso?: Date; // Cambiado a snake_case

  @Column({ name: 'motivo_egreso', type: 'text', nullable: true })
  motivo_egreso?: string; // Cambiado a snake_case

  @CreateDateColumn({ name: 'fecha_creacion' })
  fecha_creacion: Date; // Cambiado a snake_case

  @UpdateDateColumn({ name: 'fecha_actualizacion' })
  fecha_actualizacion: Date; // Cambiado a snake_case
}