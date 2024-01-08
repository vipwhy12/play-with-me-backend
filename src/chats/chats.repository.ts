import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatsModel } from './chats.entity';
import { Repository } from 'typeorm';
import { CreateChatDto } from './dto/chat-create.dto';

@Injectable()
export class ChatsRepository {
  constructor(
    @InjectRepository(ChatsModel)
    private chatsRepository: Repository<ChatsModel>,
  ) { }

  async createChat(dto: CreateChatDto) {
    const chat = await this.chatsRepository.save({
      users: dto.userIds.map((id) => ({ id })),
    });

    return this.chatsRepository.findOne({
      where: {
        id: chat.id,
      },
    });
  }
}
