import type { AuthRepository } from '../domain/auth.repository';
import { User } from '../domain/user.entity';
export declare class RegisterUseCase {
    private readonly authRepository;
    constructor(authRepository: AuthRepository);
    execute(email: string, password: string, name: string): Promise<User>;
}
