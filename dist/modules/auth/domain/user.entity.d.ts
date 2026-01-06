import { UserRole } from './user-role.enum';
export declare class User {
    id?: number;
    email: string;
    password: string;
    name: string;
    role: UserRole;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    constructor(data?: Partial<User>);
    static create(data: Partial<User>): User;
}
