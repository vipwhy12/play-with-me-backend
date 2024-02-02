import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsModel } from './chats.entity';
import { ChatRegisterDto } from './dto/chat-register.dto';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post()
  registerChat(@Body() chatRegisterDto: ChatRegisterDto): Promise<ChatsModel> {
    return this.chatsService.registerChat(chatRegisterDto);
  }

  @Delete(':id')
  deleteChat(@Param('id') id: number) {
    return this.chatsService.deleteChat(id);
  }

  @Get(':page')
  getAllChat(@Param('page') page: number): Promise<ChatsModel[]> {
    return this.chatsService.getAllChat(page);
  }
}
