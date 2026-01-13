import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('usuarios') // Cambiado a 'usuarios' para coincidir con la tabla
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'ci', // Mapeo al campo correcto
    type: 'varchar',
    length: 20,
    unique: true,
    nullable: false,
    comment: 'Cédula de identidad única'
  })
  ci: string; // Cambiado de 'username' a 'ci'

  @Column({
    name: 'nombre',
    type: 'varchar',
    length: 100,
    nullable: false
  })
  nombre: string;

  @Column({
    name: 'apellido_paterno',
    type: 'varchar',
    length: 100,
    nullable: true
  })
  apellidoPaterno: string | null;

  @Column({
    name: 'apellido_materno',
    type: 'varchar',
    length: 100,
    nullable: true
  })
  apellidoMaterno: string | null;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true
  })
  sexo: string | null;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true
  })
  nacionalidad: string | null;

  @Column({
    name: 'fecha_nacimiento',
    type: 'date',
    nullable: true
  })
  fechaNacimiento: Date | null;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
    nullable: false
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true
  })
  telefono: string | null;

  @Column({
    type: 'text',
    nullable: true
  })
  direccion: string | null;

  @Column({
    name: 'tipo_usuario',
    type: 'varchar',
    length: 50,
    default: 'personal'
  })
  tipoUsuario: string;

  @Column({
    name: 'password_hash',
    type: 'varchar',
    length: 255,
    nullable: false
  })
  password: string; // Renombrado para mantener consistencia en el código

  @Column({
    default: true
  })
  activo: boolean;

  @Column({
    name: 'fecha_ingreso',
    type: 'date',
    default: () => 'CURRENT_DATE'
  })
  fechaIngreso: Date;

  @Column({
    name: 'sueldo_diario',
    type: 'numeric',
    precision: 10,
    scale: 2,
    nullable: true
  })
  sueldoDiario: number | null;

  @Column({
    type: 'text',
    nullable: true
  })
  observaciones: string | null;

  @CreateDateColumn({
    name: 'fecha_creacion',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'fecha_actualizacion',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP'
  })
  updatedAt: Date;

  // Campos adicionales para funcionalidad del sistema
  @Column({
    name: 'assignment_status',
    type: 'enum',
    enum: ['asignado', 'libre'],
    default: 'libre',
    comment: 'Estado de asignación del agente'
  })
  assignmentStatus: 'asignado' | 'libre';

  @Column({
    name: 'assigned_requests_count',
    type: 'int',
    default: 0,
    comment: 'Cantidad de solicitudes asignadas al agente'
  })
  assignedRequestsCount: number;

  @Column({
    name: 'permissions_version',
    type: 'int',
    default: 0,
    comment: 'Incrementa cuando cambian los permisos del usuario'
  })
  permissionsVersion: number;

  @Column({
    name: 'is_admin',
    type: 'boolean',
    default: false,
    comment: 'Indica si el usuario es administrador'
  })
  isAdmin: boolean;

  @Column({
    name: 'reset_password_token',
    type: 'text',
    nullable: true
  })
  resetPasswordToken: string | null;

  @Column({
    name: 'reset_password_expires',
    type: 'timestamp',
    nullable: true
  })
  resetPasswordExpires: Date | null;
}