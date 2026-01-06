"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_user_entity_1 = require("./infrastructure/typeorm-user.entity");
const typeorm_auth_repository_1 = require("./infrastructure/typeorm-auth.repository");
const auth_controller_1 = require("./infrastructure/auth.controller");
const login_use_case_1 = require("./application/login.use-case");
const register_use_case_1 = require("./application/register.use-case");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([typeorm_user_entity_1.UserEntity]),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            typeorm_auth_repository_1.TypeOrmAuthRepository,
            {
                provide: 'AUTH_REPOSITORY',
                useExisting: typeorm_auth_repository_1.TypeOrmAuthRepository,
            },
            login_use_case_1.LoginUseCase,
            register_use_case_1.RegisterUseCase,
        ],
        exports: [
            'AUTH_REPOSITORY',
            login_use_case_1.LoginUseCase,
            register_use_case_1.RegisterUseCase,
        ],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map