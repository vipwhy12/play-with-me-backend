import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ChatsRepository } from './chats.repository';
import { ChatRegisterDto } from './dto/chat-register.dto';
import { ChatsModel } from './chats.entity';

@Injectable()
export class ChatsService {
  constructor(private chatsRepository: ChatsRepository) {}

  async registerChat(chatRegisterDto: ChatRegisterDto): Promise<ChatsModel> {
    const newChat = this.chatsRepository.register(chatRegisterDto);

    if (!newChat) {
      throw new HttpException(
        '🧨저장에 실패하였습니다',
        HttpStatus.BAD_REQUEST,
      );
    }

    return newChat;
  }
}
