import { Injectable } from '@nestjs/common';
import { ChatsRepository } from './chats.repository';
import { CreateChatDto } from './dto/chat-create.dto';

@Injectable()
export class ChatsService {
  constructor(private chatsRepository: ChatsRepository) { }

  async createChat(createChatDto: CreateChatDto) {
    return await this.chatsRepository.createChat(createChatDto);
  }
}
