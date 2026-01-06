"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmAuthRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../domain/user.entity");
const typeorm_user_entity_1 = require("./typeorm-user.entity");
let TypeOrmAuthRepository = class TypeOrmAuthRepository {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async findByEmail(email) {
        const userEntity = await this.userRepository.findOne({
            where: { email },
        });
        if (!userEntity) {
            return null;
        }
        return this.convertToDomain(userEntity);
    }
    async findById(id) {
        const userEntity = await this.userRepository.findOne({
            where: { id },
        });
        if (!userEntity) {
            return null;
        }
        return this.convertToDomain(userEntity);
    }
    async save(user) {
        if (user.id) {
            const existing = await this.userRepository.findOne({
                where: { email: user.email },
            });
            if (existing && existing.id !== user.id) {
                throw new common_1.ConflictException('Email already exists');
            }
        }
        else {
            const existing = await this.findByEmail(user.email);
            if (existing) {
                throw new common_1.ConflictException('Email already exists');
            }
        }
        const userEntity = this.convertToEntity(user);
        const savedEntity = await this.userRepository.save(userEntity);
        return this.convertToDomain(savedEntity);
    }
    async update(id, data) {
        const existingEntity = await this.userRepository.findOne({ where: { id } });
        if (!existingEntity) {
            throw new common_1.NotFoundException(`User with id ${id} not found`);
        }
        if (data.email && data.email !== existingEntity.email) {
            const userWithEmail = await this.userRepository.findOne({
                where: { email: data.email },
            });
            if (userWithEmail && userWithEmail.id !== id) {
                throw new common_1.ConflictException('Email already exists');
            }
        }
        await this.userRepository.update(id, data);
        const updatedEntity = await this.userRepository.findOne({
            where: { id },
        });
        if (!updatedEntity) {
            throw new common_1.NotFoundException(`User with id ${id} not found`);
        }
        return this.convertToDomain(updatedEntity);
    }
    convertToDomain(entity) {
        return new user_entity_1.User({
            id: entity.id,
            email: entity.email,
            password: entity.password,
            name: entity.name,
            role: entity.role,
            isActive: entity.isActive,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        });
    }
    convertToEntity(user) {
        const entity = new typeorm_user_entity_1.UserEntity();
        if (user.id) {
            entity.id = user.id;
        }
        entity.email = user.email;
        entity.password = user.password;
        entity.name = user.name;
        entity.role = user.role;
        entity.isActive = user.isActive;
        entity.createdAt = user.createdAt;
        entity.updatedAt = user.updatedAt;
        return entity;
    }
};
exports.TypeOrmAuthRepository = TypeOrmAuthRepository;
exports.TypeOrmAuthRepository = TypeOrmAuthRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(typeorm_user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TypeOrmAuthRepository);
//# sourceMappingURL=typeorm-auth.repository.js.map