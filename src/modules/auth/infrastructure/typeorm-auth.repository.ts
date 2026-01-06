// src/modules/auth/infrastructure/typeorm-auth.repository.ts
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../domain/user.entity';
import { UserEntity } from './typeorm-user.entity';

@Injectable()
export class TypeOrmAuthRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const userEntity = await this.userRepository.findOne({
      where: { email },
    });

    if (!userEntity) {
      return null;
    }

    return this.convertToDomain(userEntity);
  }

  async findById(id: number): Promise<User | null> {
    const userEntity = await this.userRepository.findOne({
      where: { id },
    });

    if (!userEntity) {
      return null;
    }

    return this.convertToDomain(userEntity);
  }

  async save(user: User): Promise<User> {
    // Si el usuario ya tiene ID, verificar que el email no esté duplicado
    if (user.id) {
      const existing = await this.userRepository.findOne({
        where: { email: user.email },
      });
      if (existing && existing.id !== user.id) {
        throw new ConflictException('Email already exists');
      }
    } else {
      // Para usuario nuevo, verificar email único
      const existing = await this.findByEmail(user.email);
      if (existing) {
        throw new ConflictException('Email already exists');
      }
    }

    const userEntity = this.convertToEntity(user);
    const savedEntity = await this.userRepository.save(userEntity);
    return this.convertToDomain(savedEntity);
  }

  async update(id: number, data: Partial<User>): Promise<User> {
    // Verificar si el usuario existe
    const existingEntity = await this.userRepository.findOne({ where: { id } });
    if (!existingEntity) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    // Si se está actualizando el email, verificar que no exista
    if (data.email && data.email !== existingEntity.email) {
      const userWithEmail = await this.userRepository.findOne({
        where: { email: data.email },
      });
      if (userWithEmail && userWithEmail.id !== id) {
        throw new ConflictException('Email already exists');
      }
    }

    // Actualizar
    await this.userRepository.update(id, data);
    
    const updatedEntity = await this.userRepository.findOne({
      where: { id },
    });
    
    if (!updatedEntity) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return this.convertToDomain(updatedEntity);
  }

  // Métodos de conversión
  private convertToDomain(entity: UserEntity): User {
    return new User({
      id: entity.id,
      email: entity.email,
      password: entity.password,
      name: entity.name,
      role: entity.role,
      isActive: entity.isActive,
      //phone: entity.phone,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  private convertToEntity(user: User): UserEntity {
    const entity = new UserEntity();
    if (user.id) {
      entity.id = user.id;
    }
    entity.email = user.email;
    entity.password = user.password;
    entity.name = user.name;
    entity.role = user.role;
    entity.isActive = user.isActive;
    
    entity.createdAt = user.createdAt;
    entity.updatedAt = user.updatedAt;
    return entity;
  }
}