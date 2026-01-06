import { RegisterUseCase } from '../application/register.use-case';
import { LoginUseCase } from '../application/login.use-case';
import { CreateUserDto } from '../application/dtos/create-user.dto';
import { LoginDto } from '../application/dtos/login.dto';
export declare class AuthController {
    private readonly registerUseCase;
    private readonly loginUseCase;
    constructor(registerUseCase: RegisterUseCase, loginUseCase: LoginUseCase);
    register(createUserDto: CreateUserDto): Promise<{
        success: boolean;
        message: string;
        user: {
            id: number | undefined;
            email: string;
            name: string;
            role: import("../domain/user-role.enum").UserRole;
            isActive: boolean;
        };
        timestamp: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        success: boolean;
        message: string;
        token: string;
        user: {
            id: number | undefined;
            email: string;
            name: string;
            role: import("../domain/user-role.enum").UserRole;
        };
        timestamp: string;
    }>;
    test(): {
        success: boolean;
        message: string;
        timestamp: string;
    };
}
