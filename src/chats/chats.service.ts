import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ChatsRepository } from './chats.repository';
import { ChatRegisterDto } from './dto/chat-register.dto';
import { ChatsModel } from './chats.entity';
import { DeleteResult } from 'typeorm';

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

  async deleteChat(id: number): Promise<DeleteResult> {
    const isExistChat = this.chatsRepository.findOneChat(id);

    if (!isExistChat) {
      throw new BadRequestException('🚨 존재하지 않는 채팅입니다!');
    }

    return await this.chatsRepository.deleteChat(id);
  }
}
