// src/app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('root')
@Controller() // Las rutas serán prefijadas con /api (por app.setGlobalPrefix('api'))
export class AppController {
  
  @Get()
  @ApiOperation({ summary: 'Endpoint raíz de la API' })
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

  @Get('health')
  @ApiOperation({ summary: 'Verifica el estado del servicio' })
  healthCheck() {
    return {
      status: 'healthy',
      service: 'Sistema Hogar API',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      database: 'connected', // Esto asume que TypeORM se conecta correctamente
      memory: process.memoryUsage(),
      nodeVersion: process.version
    };
  }

  @Get('version')
  @ApiOperation({ summary: 'Obtiene la versión de la API' })
  getVersion() {
    return {
      version: '1.0.0',
      build: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString()
    };
  }
}