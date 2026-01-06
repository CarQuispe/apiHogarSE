// src/modules/auth/application/login.use-case.ts
import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import type { AuthRepository } from '../domain/auth.repository';
import { User } from '../domain/user.entity';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('AUTH_REPOSITORY')
    private readonly authRepository: AuthRepository,
  ) {}

  async execute(email: string, password: string): Promise<{ user: User; token: string }> {
    const user = await this.authRepository.findByEmail(email);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generar token JWT
    const token = this.generateToken(user);

    return { user, token };
  }

  private generateToken(user: User): string {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    };

    // Usa una variable de entorno para el secreto
    const secret = process.env.JWT_SECRET || 'default-secret-change-in-production';
    const expiresIn = process.env.JWT_EXPIRES_IN || '24h';

    // SOLUCIÓN: Asegurar que expiresIn sea del tipo correcto
    const signOptions: jwt.SignOptions = {
      expiresIn: expiresIn as jwt.SignOptions['expiresIn'], // Type assertion
    };

    return jwt.sign(payload, secret, signOptions);
  }
}