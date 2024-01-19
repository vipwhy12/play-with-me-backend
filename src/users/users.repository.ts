import { UsersModel } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UsersModel)
    private userRepository: Repository<UsersModel>,
  ) { }

  async createUser(createUserDto: CreateUserDto): Promise<UsersModel> {
    return await this.userRepository.save(createUserDto);
  }

  async existUserEmail(email: string): Promise<boolean> {
    return await this.userRepository.exist({
      where: {
        email,
      },
    });
  }

  async getUserByEmail(email: string): Promise<UsersModel> {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }
}
