import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) { }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      //TODO : 회원 가입 직후 로그인 처리 될 수 있도록 인증 인가 로직 추가하기
      return await this.usersRepository.createUser(createUserDto);
    } catch (error) {
      if (error.errno === 1062) {
        throw new HttpException(
          '💥이미 존재하는 아이디입니다!',
          HttpStatus.CONFLICT,
        );
      }
      throw error;
    }
  }
}
