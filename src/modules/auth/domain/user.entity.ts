// src/modules/auth/domain/user.entity.ts
import { UserRole } from './user-role.enum';

export class User {
  id?: number;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  // Constructor simplificado y más flexible
  constructor(data: Partial<User> = {}) {
    this.id = data.id;
    this.email = data.email || '';
    this.password = data.password || '';
    this.name = data.name || '';
    this.role = data.role || UserRole.USER;
    this.isActive = data.isActive !== undefined ? data.isActive : true;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  // Método factory opcional
  static create(data: Partial<User>): User {
    return new User(data);
  }
}