import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersModel } from './user.entity';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) { }

  async createUser(user: CreateUserDto): Promise<UsersModel> {
    const isEmailExists = await this.usersRepository.existUserEmail(user.email);

    if (isEmailExists) {
      throw new BadRequestException('💥이미 존재하는 이메일입니다!');
    }

    const newUser = await this.usersRepository.createUser(user);

    return newUser;
  }

  async getUserByEmail(email: string): Promise<UsersModel> {
    return this.usersRepository.getUserByEmail(email);
  }
}
