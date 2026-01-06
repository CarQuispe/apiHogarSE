// config/swagger.config.ts
import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Hogar Santa Emilia API')
  .setDescription('API de gestión administrativa')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
