import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { };

  @Post()
  async singUp(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<void> {
    return await this.usersService.signUp(createUserDto);
  }
}
