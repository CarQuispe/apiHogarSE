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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
let AppController = class AppController {
    getRoot() {
        return {
            message: '🎉 ¡API Sistema Hogar funcionando correctamente!',
            service: 'Sistema de Gestión del Hogar de Niños',
            version: '1.0.0',
            timestamp: new Date().toISOString(),
            status: 'active',
            documentation: '/api/docs',
            endpoints: {
                auth: {
                    login: 'POST /api/auth/login',
                    register: 'POST /api/auth/register',
                    profile: 'GET /api/auth/profile'
                },
                ninios: {
                    list: 'GET /api/ninios',
                    create: 'POST /api/ninios',
                    detail: 'GET /api/ninios/:id'
                },
                health: 'GET /api/health'
            },
            environment: process.env.NODE_ENV || 'development'
        };
    }
    healthCheck() {
        return {
            status: 'healthy',
            service: 'Sistema Hogar API',
            uptime: process.uptime(),
            timestamp: new Date().toISOString(),
            database: 'connected',
            memory: process.memoryUsage(),
            nodeVersion: process.version
        };
    }
    getVersion() {
        return {
            version: '1.0.0',
            build: process.env.NODE_ENV || 'development',
            timestamp: new Date().toISOString()
        };
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Endpoint raíz de la API' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getRoot", null);
__decorate([
    (0, common_1.Get)('health'),
    (0, swagger_1.ApiOperation)({ summary: 'Verifica el estado del servicio' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "healthCheck", null);
__decorate([
    (0, common_1.Get)('version'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtiene la versión de la API' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getVersion", null);
exports.AppController = AppController = __decorate([
    (0, swagger_1.ApiTags)('root'),
    (0, common_1.Controller)()
], AppController);
//# sourceMappingURL=app.controller.js.map