import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions: CorsOptions = {
    origin: process.env.FRONT_ORIGIN,
    credentials: true,
  };

  const config = new DocumentBuilder() //💥Swagger Document
    .setTitle('PlayWithMe Backend API Docs')
    .setDescription('The Play With Me Backend API description')
    .setVersion('1.0')
    .addTag('')
    .build();
  const document = SwaggerModule.createDocument(app, config);


  SwaggerModule.setup('api-docs', app, document);

  app.enableCors(corsOptions); //CORS 활성화

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
