import { Repository } from 'typeorm';
import { User } from '../domain/user.entity';
import { UserEntity } from './typeorm-user.entity';
export declare class TypeOrmAuthRepository {
    private readonly userRepository;
    constructor(userRepository: Repository<UserEntity>);
    findByEmail(email: string): Promise<User | null>;
    findById(id: number): Promise<User | null>;
    save(user: User): Promise<User>;
    update(id: number, data: Partial<User>): Promise<User>;
    private convertToDomain;
    private convertToEntity;
}
