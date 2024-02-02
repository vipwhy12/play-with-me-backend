import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ChatsRepository } from './chats.repository';
import { ChatRegisterDto } from './dto/chat-register.dto';
import { ChatsModel } from './chats.entity';
import { DeleteResult } from 'typeorm';

@Injectable()
export class ChatsService {
  constructor(private chatsRepository: ChatsRepository) {}

  async registerChat(chatRegisterDto: ChatRegisterDto): Promise<ChatsModel> {
    const newChat = await this.chatsRepository.register(chatRegisterDto);

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

  async getAllChat(page: number): Promise<any> {
    const take = 10; //가져올 채팅방 데이터의 개수
    const numberOfChat = await this.chatsRepository.countChats();

    if (numberOfChat === 0) {
      return new HttpException('채팅이 없습니다.', HttpStatus.NO_CONTENT);
    }

    const lastPage = Math.ceil(numberOfChat / take);

    if (!page) {
      page = 1;
    }

    if (page < 1 || page > lastPage) {
      throw new NotFoundException('🧨 해당 페이지는 존재하지 않습니다');
    }

    const getChatList = await this.chatsRepository.getAllChat(take, page);

    return {
      numberOfChat,
      presentPage: page,
      lastPage,
      getChatList,
    };
  }
}
