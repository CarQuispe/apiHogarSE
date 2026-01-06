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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NinioOrmEntity = void 0;
const typeorm_1 = require("typeorm");
let NinioOrmEntity = class NinioOrmEntity {
    id;
    ci;
    nombre;
    apellidoPaterno;
    apellidoMaterno;
    sexo;
    nacionalidad;
    etnia;
    fechaNacimiento;
    fechaIngreso;
    estado;
    observacionesIngreso;
    fechaEgreso;
    motivoEgreso;
    fechaCreacion;
    fechaActualizacion;
};
exports.NinioOrmEntity = NinioOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], NinioOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], NinioOrmEntity.prototype, "ci", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], NinioOrmEntity.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'apellido_paterno' }),
    __metadata("design:type", String)
], NinioOrmEntity.prototype, "apellidoPaterno", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'apellido_materno', nullable: true }),
    __metadata("design:type", String)
], NinioOrmEntity.prototype, "apellidoMaterno", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], NinioOrmEntity.prototype, "sexo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], NinioOrmEntity.prototype, "nacionalidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], NinioOrmEntity.prototype, "etnia", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_nacimiento', type: 'date' }),
    __metadata("design:type", Date)
], NinioOrmEntity.prototype, "fechaNacimiento", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_ingreso', type: 'date' }),
    __metadata("design:type", Date)
], NinioOrmEntity.prototype, "fechaIngreso", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], NinioOrmEntity.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'observaciones_ingreso', type: 'text', nullable: true }),
    __metadata("design:type", String)
], NinioOrmEntity.prototype, "observacionesIngreso", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_egreso', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], NinioOrmEntity.prototype, "fechaEgreso", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'motivo_egreso', type: 'text', nullable: true }),
    __metadata("design:type", String)
], NinioOrmEntity.prototype, "motivoEgreso", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'fecha_creacion' }),
    __metadata("design:type", Date)
], NinioOrmEntity.prototype, "fechaCreacion", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'fecha_actualizacion' }),
    __metadata("design:type", Date)
], NinioOrmEntity.prototype, "fechaActualizacion", void 0);
exports.NinioOrmEntity = NinioOrmEntity = __decorate([
    (0, typeorm_1.Entity)('ninios')
], NinioOrmEntity);
//# sourceMappingURL=typeorm-ninio.entity.js.map