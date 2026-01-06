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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const register_use_case_1 = require("../application/register.use-case");
const login_use_case_1 = require("../application/login.use-case");
const create_user_dto_1 = require("../application/dtos/create-user.dto");
const login_dto_1 = require("../application/dtos/login.dto");
let AuthController = class AuthController {
    registerUseCase;
    loginUseCase;
    constructor(registerUseCase, loginUseCase) {
        this.registerUseCase = registerUseCase;
        this.loginUseCase = loginUseCase;
    }
    async register(createUserDto) {
        try {
            console.log('📝 Datos recibidos en register:', createUserDto);
            const user = await this.registerUseCase.execute(createUserDto.email, createUserDto.password, createUserDto.name);
            return {
                success: true,
                message: 'Usuario registrado exitosamente',
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    isActive: user.isActive,
                },
                timestamp: new Date().toISOString(),
            };
        }
        catch (error) {
            console.error('❌ Error en register controller:', error.message);
            throw new common_1.HttpException({
                success: false,
                message: error.message || 'Error en el registro',
            }, error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async login(loginDto) {
        try {
            console.log('🔐 Datos recibidos en login:', loginDto);
            const result = await this.loginUseCase.execute(loginDto.email, loginDto.password);
            return {
                success: true,
                message: 'Login exitoso',
                token: result.token,
                user: {
                    id: result.user.id,
                    email: result.user.email,
                    name: result.user.name,
                    role: result.user.role,
                },
                timestamp: new Date().toISOString(),
            };
        }
        catch (error) {
            console.error('❌ Error en login controller:', error.message);
            throw new common_1.HttpException({
                success: false,
                message: error.message || 'Error en el login',
            }, error.status || common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    test() {
        return {
            success: true,
            message: 'Auth module is working!',
            timestamp: new Date().toISOString(),
        };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "test", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [register_use_case_1.RegisterUseCase,
        login_use_case_1.LoginUseCase])
], AuthController);
//# sourceMappingURL=auth.controller.js.map