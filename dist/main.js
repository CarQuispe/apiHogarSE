"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
require("dotenv/config");
console.log('RAW ENV DATABASE_URL:', process.env.DATABASE_URL);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const logger = new common_1.Logger('Bootstrap');
    const port = Number(configService.get('PORT', 3000));
    const nodeEnv = configService.get('NODE_ENV', 'development');
    const apiPrefix = 'api';
    const appName = 'Sistema Hogar';
    app.setGlobalPrefix(apiPrefix);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.enableCors({
        origin: [
            'http://localhost:3000',
            'http://localhost:5173',
        ],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
    if (nodeEnv !== 'production') {
        const swaggerConfig = new swagger_1.DocumentBuilder()
            .setTitle('Sistema Hogar API')
            .setDescription('API para el Sistema de Gestión del Hogar de Niños')
            .setVersion('1.0')
            .addBearerAuth({
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            in: 'header',
        }, 'JWT')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
        swagger_1.SwaggerModule.setup('api/docs', app, document);
        logger.log(' Swagger disponible en /api/docs');
    }
    await app.listen(port);
    logger.log(` ${appName} iniciado`);
    logger.log(` Entorno: ${nodeEnv}`);
    logger.log(` Puerto: ${port}`);
    logger.log(` URL: ${await app.getUrl()}`);
    logger.log(` Prefijo API: /${apiPrefix}`);
}
bootstrap().catch((error) => {
    console.error(' Error al iniciar la aplicación:', error);
    process.exit(1);
});
//# sourceMappingURL=main.js.map