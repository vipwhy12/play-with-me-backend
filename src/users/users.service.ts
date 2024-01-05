import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) { }

  async createUser(user: CreateUserDto): Promise<User> {
    const isEmailExists = await this.usersRepository.existUserEmail(user.email);

    if (isEmailExists) {
      throw new BadRequestException('💥이미 존재하는 이메일입니다!');
    }

    const newUser = await this.usersRepository.createUser(user);

    return newUser;
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.usersRepository.getUserByEmail(email);
  }
}
