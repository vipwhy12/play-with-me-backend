import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  Logger.log(
    `🚀Application ${process.env.NODE_ENV} running on port ${process.env.PORT}`,
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //속성에 프로퍼티를 자동으로 제거
      transform: true,
    }),
  );

  await app.listen(process.env.PORT);
}
bootstrap();
