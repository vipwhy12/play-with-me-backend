import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: 'playwithme',
      entities: [__dirname + '/**/*/.entity{.ts,.js}'],
      synchronize: true, //🚨데이터 베이스 초기화로 인해 프로덕션시 제거
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
