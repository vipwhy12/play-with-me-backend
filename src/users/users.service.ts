import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) { }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      //TODO : 회원 가입 직후 로그인 처리 될 수 있도록 인증 인가 로직 추가하기
      return await this.usersRepository.createUser(createUserDto);
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

  async singIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ access_token: string }> {
    try {
      const { email, password } = authCredentialsDto;
      const findUser = await this.usersRepository.singIn(email);

      if (!findUser || !(await bcrypt.compare(password, findUser.password))) {
        throw new UnauthorizedException(
          `🥲아이디 혹은 비밀번호가 일치하지 않습니다`,
        );
      }

      const payload = { useremail: findUser.email, username: findUser.name };

      return { access_token: await this.jwtService.signAsync(payload) };
    } catch (error) {
      throw new UnauthorizedException(
        `🥲아이디 혹은 비밀번호가 일치하지 않습니다`,
      );
    }
  }
}
