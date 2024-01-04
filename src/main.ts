import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //💥Swagger Document
  const config = new DocumentBuilder()
    .setTitle('PlayWithMe Backend API Docs')
    .setDescription('The Play With Me Backend API description')
    .setVersion('1.0')
    .addTag('')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  Logger.log(
    `🚀Application ${process.env.NODE_ENV} running on port ${process.env.PORT}`,
  );

  await app.listen(process.env.PORT);
}
bootstrap();
