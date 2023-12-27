import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) { }

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    try {
      await this.usersRepository.createUser(createUserDto);
    } catch (error) {
      if (error.errno === 1062) {
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            error: '💥중복된 이메일 주소로 사용자를 생성할 수 없습니다.',
          },
          HttpStatus.CONFLICT,
        );
      }
    }
  }
}
