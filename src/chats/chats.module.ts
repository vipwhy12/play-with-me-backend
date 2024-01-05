import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { ChatsGateway } from './chats.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatsRepository } from './chats.repository';
import { ChatsModel } from './chats.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatsModel])],
  controllers: [ChatsController],
  providers: [ChatsGateway, ChatsService, ChatsRepository],
  exports: [ChatsService, ChatsRepository],
})
export class ChatsModule { }
