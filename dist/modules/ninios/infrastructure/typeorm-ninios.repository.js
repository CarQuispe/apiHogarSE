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
exports.TypeormNiniosRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ninio_entity_1 = require("../domain/ninio.entity");
const typeorm_ninio_entity_1 = require("./typeorm-ninio.entity");
let TypeormNiniosRepository = class TypeormNiniosRepository {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    toDomain(entity) {
        return new ninio_entity_1.Ninio(entity.id, entity.ci, entity.nombre, entity.apellidoPaterno, entity.apellidoMaterno ?? null, entity.sexo ?? null, entity.nacionalidad ?? null, entity.etnia ?? null, entity.fechaNacimiento, entity.fechaIngreso, entity.estado, entity.observacionesIngreso ?? undefined, entity.fechaEgreso ?? undefined, entity.motivoEgreso ?? undefined, entity.fechaCreacion, entity.fechaActualizacion);
    }
    toOrm(data) {
        return {
            nombre: data.nombre,
            apellidoPaterno: data.apellidoPaterno,
            apellidoMaterno: data.apellidoMaterno ?? undefined,
            sexo: data.sexo ?? undefined,
            nacionalidad: data.nacionalidad ?? undefined,
            etnia: data.etnia ?? undefined,
            fechaNacimiento: data.fechaNacimiento,
            fechaIngreso: data.fechaIngreso,
            estado: data.estado,
            observacionesIngreso: data.observacionesIngreso,
            fechaEgreso: data.fechaEgreso,
            motivoEgreso: data.motivoEgreso,
        };
    }
    async create(ninio) {
        const entity = this.repo.create({
            ...this.toOrm(ninio),
            ci: ninio.ci,
        });
        const saved = await this.repo.save(entity);
        return this.toDomain(saved);
    }
    async update(id, data) {
        const entity = await this.repo.findOneBy({ id });
        if (!entity) {
            throw new common_1.NotFoundException('Niño no encontrado');
        }
        Object.assign(entity, this.toOrm(data));
        const saved = await this.repo.save(entity);
        return this.toDomain(saved);
    }
    async delete(id) {
        await this.repo.delete(id);
    }
    async findById(id) {
        const entity = await this.repo.findOneBy({ id });
        return entity ? this.toDomain(entity) : null;
    }
    async search(filters) {
        const qb = this.repo.createQueryBuilder('n');
        if (filters.estado) {
            qb.andWhere('n.estado = :estado', { estado: filters.estado });
        }
        if (filters.nombre) {
            qb.andWhere('n.nombre ILIKE :nombre', {
                nombre: `%${filters.nombre}%`,
            });
        }
        if (filters.ci) {
            qb.andWhere('n.ci = :ci', { ci: filters.ci });
        }
        const result = await qb.getMany();
        return result.map((entity) => this.toDomain(entity));
    }
};
exports.TypeormNiniosRepository = TypeormNiniosRepository;
exports.TypeormNiniosRepository = TypeormNiniosRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(typeorm_ninio_entity_1.NinioOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TypeormNiniosRepository);
//# sourceMappingURL=typeorm-ninios.repository.js.map