import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. ¡AQUÍ ESTÁ LA MAGIA! Esto permite que tu frontend de Vite se conecte
  app.enableCors({
    origin: 'http://localhost:5173', // La URL de tu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // 2. Si estás usando validaciones globales (para los DTOs)
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();