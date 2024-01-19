import { UsersModel } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { AuthRegisterDto } from 'src/auth/dto/auth-register.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UsersModel)
    private userRepository: Repository<UsersModel>,
  ) { }

  async createUser(authRegisterDto: AuthRegisterDto): Promise<UsersModel> {
    return await this.userRepository.save(authRegisterDto);
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