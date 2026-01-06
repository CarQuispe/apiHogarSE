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
exports.NiniosController = void 0;
const common_1 = require("@nestjs/common");
const create_ninio_use_case_1 = require("../application/create-ninio.use-case");
const update_ninio_use_case_1 = require("../application/update-ninio.use-case");
const delete_ninio_use_case_1 = require("../application/delete-ninio.use-case");
const get_ninio_by_id_use_case_1 = require("../application/get-ninio-by-id.use-case");
const search_ninios_use_case_1 = require("../application/search-ninios.use-case");
let NiniosController = class NiniosController {
    createUC;
    updateUC;
    deleteUC;
    getByIdUC;
    searchUC;
    constructor(createUC, updateUC, deleteUC, getByIdUC, searchUC) {
        this.createUC = createUC;
        this.updateUC = updateUC;
        this.deleteUC = deleteUC;
        this.getByIdUC = getByIdUC;
        this.searchUC = searchUC;
    }
    create(dto) {
        return this.createUC.execute(dto);
    }
    search(query) {
        return this.searchUC.execute(query);
    }
    get(id) {
        return this.getByIdUC.execute(+id);
    }
    update(id, dto) {
        return this.updateUC.execute(+id, dto);
    }
    remove(id) {
        return this.deleteUC.execute(+id);
    }
};
exports.NiniosController = NiniosController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NiniosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NiniosController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], NiniosController.prototype, "get", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], NiniosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], NiniosController.prototype, "remove", null);
exports.NiniosController = NiniosController = __decorate([
    (0, common_1.Controller)('ninios'),
    __metadata("design:paramtypes", [create_ninio_use_case_1.CreateNinioUseCase,
        update_ninio_use_case_1.UpdateNinioUseCase,
        delete_ninio_use_case_1.DeleteNinioUseCase,
        get_ninio_by_id_use_case_1.GetNinioByIdUseCase,
        search_ninios_use_case_1.SearchNiniosUseCase])
], NiniosController);
//# sourceMappingURL=ninios.controller.js.map