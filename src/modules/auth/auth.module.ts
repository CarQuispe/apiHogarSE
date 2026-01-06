// src/modules/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infrastructure/typeorm-user.entity';
import { TypeOrmAuthRepository } from './infrastructure/typeorm-auth.repository';
import { AuthController } from './infrastructure/auth.controller'; // AÑADIR ESTO
import { LoginUseCase } from './application/login.use-case';
import { RegisterUseCase } from './application/register.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AuthController], // AÑADIR ESTO - ¡ES IMPORTANTE!
  providers: [
    TypeOrmAuthRepository,
    {
      provide: 'AUTH_REPOSITORY',
      useExisting: TypeOrmAuthRepository,
    },
    LoginUseCase,
    RegisterUseCase,
  ],
  exports: [
    'AUTH_REPOSITORY',
    LoginUseCase,
    RegisterUseCase,
  ],
})
export class AuthModule {}