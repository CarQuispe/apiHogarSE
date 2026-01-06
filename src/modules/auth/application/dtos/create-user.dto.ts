// src/modules/auth/application/dtos/create-user.dto.ts
import { IsEmail, IsString, MinLength, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Email del usuario',
    example: 'usuario@ejemplo.com',
    required: true
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Contraseña (mínimo 6 caracteres)',
    example: 'password123',
    required: true,
    minLength: 6
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'Nombre completo',
    example: 'Juan Pérez',
    required: true,
    minLength: 2
  })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiPropertyOptional({
    description: 'Teléfono (opcional)',
    example: '+1234567890',
    nullable: true
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({
    description: 'Rol del usuario (USER por defecto)',
    example: 'USER',
    default: 'USER'
  })
  @IsOptional()
  @IsString()
  role?: string = 'USER';

  @ApiPropertyOptional({
    description: 'Estado activo del usuario',
    example: true,
    default: true
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;
}