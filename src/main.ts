import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { PORT } from '@config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //Ignore data that is not in the DTOs
      forbidNonWhitelisted: true, //Throw error if prohibited data exists
      disableErrorMessages: true, //Disable error messages (production)
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Organization metrics')
    .setDescription('Organization metrics services')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(PORT || 3000);
}
bootstrap();
