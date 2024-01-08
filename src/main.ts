import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
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

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //속성에 프로퍼티를 자동으로 제거
      transform: true,
    }),
  );
  Logger.log(
    `🚀Application ${process.env.NODE_ENV} running on port ${process.env.PORT}`,
  );

  await app.listen(process.env.PORT);
}
bootstrap();
