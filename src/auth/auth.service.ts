import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { AuthInfoDto } from './dto/auth-info.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersRepository } from 'src/users/users.repository';
import { JwtService } from '@nestjs/jwt';
import { TokenResponseDto } from './dto/auth-token.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersRepository: UsersRepository,
  ) { }

  //✨회원가입
  async registerWithEmail(user: AuthRegisterDto): Promise<TokenResponseDto> {
    const hash = await bcrypt.hash(
      user.password,
      parseInt(this.configService.get('LOGIN_HASH_ROUND')),
    );

    const isEmailExists = await this.usersRepository.existUserEmail(user.email);

    if (isEmailExists) {
      throw new BadRequestException('💥이미 존재하는 이메일입니다!');
    }

    const newUser = await this.usersRepository.createUser({
      ...user,
      password: hash,
    });

    //회원가입 완료 후 로그인
    return this.loginUser(newUser);
  }

  async loginUser(user: AuthInfoDto): Promise<TokenResponseDto> {
    return {
      accessToken: this.signToken(user, false),
      refreshToken: this.signToken(user, true),
    };
  }

  //로그인 회원가입 : 🪙토큰발급
  signToken(user: AuthInfoDto, isRefreshToken: boolean): string {
    const payload = {
      email: user.email,
      name: user.name,
      type: isRefreshToken ? 'refresh' : 'access',
    };

    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: isRefreshToken ? 3600 : 300,
    });
  }

  //로그인 : 유효성 검사
  async validateUser(user: AuthCredentialsDto): Promise<AuthInfoDto> {
    const existingUser = await this.usersRepository.getUserByEmail(user.email);

    if (!existingUser) {
      throw new UnauthorizedException('😰존재하지 않는 사용자입니다');
    }

    const passwordOK = await bcrypt.compare(
      user.password,
      existingUser.password,
    );

    if (!passwordOK) {
      throw new UnauthorizedException('😰유효하지 않은 비밀번호입니다');
    }

    const { createdAt, password, ...userInfo } = existingUser; //사용자 객체를 반환하기 전에 객체에서 비밀번호,id 속성을 제거
    return userInfo;
  }
}
