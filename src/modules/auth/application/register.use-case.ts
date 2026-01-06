// src/modules/auth/application/register.use-case.ts
import { Injectable, Inject, ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import type { AuthRepository } from '../domain/auth.repository';
import { User } from '../domain/user.entity';
import { UserRole } from '../domain/user-role.enum';

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject('AUTH_REPOSITORY')
    private readonly authRepository: AuthRepository,
  ) {}

  async execute(
    email: string,
    password: string,
    name: string,
  ): Promise<User> {
    try {
      console.log('🔍 RegisterUseCase - Iniciando registro para:', email);
      
      // Verificar si el usuario ya existe
      const existingUser = await this.authRepository.findByEmail(email);
      if (existingUser) {
        console.log('❌ Usuario ya existe:', email);
        throw new ConflictException('User with this email already exists');
      }

      console.log('🔍 Hash de contraseña...');
      // Hash de la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      console.log('🔍 Creando usuario...');
      // Crear usuario usando el constructor corregido
      const user = new User({
        email,
        password: hashedPassword,
        name,
        role: UserRole.USER,
        isActive: true,
        // createdAt y updatedAt se asignarán automáticamente en el constructor
      });

      console.log('🔍 Guardando usuario...');
      // Guardar usuario
      const savedUser = await this.authRepository.save(user);
      
      console.log('✅ Usuario guardado ID:', savedUser.id);
      return savedUser;
    } catch (error) {
      console.error('❌ RegisterUseCase - Error:', error);
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('Error creating user: ' + error.message);
    }
  }
}