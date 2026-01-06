// src/modules/auth/domain/auth.repository.ts
import { User } from './user.entity';

export interface AuthRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  save(user: User): Promise<User>;
  update(id: number, data: Partial<User>): Promise<User>;
  // delete(id: number): Promise<void>; // Opcional, solo si lo necesitas
}
