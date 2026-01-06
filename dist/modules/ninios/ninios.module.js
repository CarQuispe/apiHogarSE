"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NiniosModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_ninio_entity_1 = require("./infrastructure/typeorm-ninio.entity");
const typeorm_ninios_repository_1 = require("./infrastructure/typeorm-ninios.repository");
const ninios_controller_1 = require("./infrastructure/ninios.controller");
const ninio_repository_1 = require("./domain/ninio.repository");
const create_ninio_use_case_1 = require("./application/create-ninio.use-case");
const update_ninio_use_case_1 = require("./application/update-ninio.use-case");
const delete_ninio_use_case_1 = require("./application/delete-ninio.use-case");
const get_ninio_by_id_use_case_1 = require("./application/get-ninio-by-id.use-case");
const search_ninios_use_case_1 = require("./application/search-ninios.use-case");
let NiniosModule = class NiniosModule {
};
exports.NiniosModule = NiniosModule;
exports.NiniosModule = NiniosModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([typeorm_ninio_entity_1.NinioOrmEntity]),
        ],
        controllers: [
            ninios_controller_1.NiniosController,
        ],
        providers: [
            { provide: ninio_repository_1.NinioRepository, useClass: typeorm_ninios_repository_1.TypeormNiniosRepository },
            create_ninio_use_case_1.CreateNinioUseCase,
            update_ninio_use_case_1.UpdateNinioUseCase,
            delete_ninio_use_case_1.DeleteNinioUseCase,
            get_ninio_by_id_use_case_1.GetNinioByIdUseCase,
            search_ninios_use_case_1.SearchNiniosUseCase,
        ],
    })
], NiniosModule);
//# sourceMappingURL=ninios.module.js.map