import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatsModel } from './chats.entity';
import { DeleteResult, Repository } from 'typeorm';
import { ChatRegisterDto } from './dto/chat-register.dto';

@Injectable()
export class ChatsRepository {
  constructor(
    @InjectRepository(ChatsModel)
    private chatsRepository: Repository<ChatsModel>,
  ) {}

  async register(chatRegisterDto: ChatRegisterDto): Promise<ChatsModel> {
    const { userIds, gameName, gameDescription, chatName, numberOfChat } =
      chatRegisterDto;

    const chat = await this.chatsRepository.save({
      users: userIds.map((id) => ({ id })),
      gameName,
      gameDescription,
      chatName,
      numberOfChat,
    });

    return this.findOneChat(chat.id);
  }

  async findOneChat(id: number): Promise<ChatsModel> {
    return this.chatsRepository.findOne({
      where: {
        id,
      },
    });
  }

  async deleteChat(id: number): Promise<DeleteResult> {
    return await this.chatsRepository.delete({ id: id });
  }
}
