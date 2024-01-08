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
    const { name, email, password } = createUserDto;
    const user = this.userRepository.create({ name, email, password });
    return await this.userRepository.save(user);
  }
}