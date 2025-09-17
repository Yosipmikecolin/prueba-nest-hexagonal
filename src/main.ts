import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DomainExceptionFilter } from './modules/shared/errors/global-exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //? CONFIGURACIÓN DE LOS DTOS
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  //? CONFIGURACIÓN DE LOS LOS ERRORES
  app.useGlobalFilters(new DomainExceptionFilter());

  //? CONFIGURACIÓN DE LA DOCUMENTACIÓN
  const config = new DocumentBuilder()
    .setTitle('Task Manager API')
    .setDescription('API para gestionar usuarios y tareas')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
