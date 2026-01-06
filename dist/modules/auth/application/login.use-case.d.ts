import type { AuthRepository } from '../domain/auth.repository';
import { User } from '../domain/user.entity';
export declare class LoginUseCase {
    private readonly authRepository;
    constructor(authRepository: AuthRepository);
    execute(email: string, password: string): Promise<{
        user: User;
        token: string;
    }>;
    private generateToken;
}
