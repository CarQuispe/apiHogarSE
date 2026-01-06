// src/main.ts
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import 'dotenv/config'; 

console.log('RAW ENV DATABASE_URL:', process.env.DATABASE_URL);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  // ==========================
  // ENV VARIABLES (reales)
  // ==========================
  const port = Number(configService.get('PORT', 3000));
  const nodeEnv = configService.get<string>('NODE_ENV', 'development');
  const apiPrefix = 'api';
  const appName = 'Sistema Hogar';

  // ==========================
  // GLOBAL CONFIG
  // ==========================
  app.setGlobalPrefix(apiPrefix);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // ==========================
  // CORS
  // ==========================
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:5173', // Vite
      'https://webhogar.onrender.com',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // ==========================
  // SWAGGER (solo dev)
  // ==========================
  if (nodeEnv !== 'production') {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Sistema Hogar API')
      .setDescription('API para el Sistema de Gestión del Hogar de Niños')
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          in: 'header',
        },
        'JWT',
      )
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api/docs', app, document);

    logger.log(' Swagger disponible en /api/docs');
  }

  // ==========================
  // START SERVER
  // ==========================
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
