import { UserRole } from '../domain/user-role.enum';
export declare class UserEntity {
    id: number;
    email: string;
    password: string;
    name: string;
    role: UserRole;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    toDomain(): any;
}
