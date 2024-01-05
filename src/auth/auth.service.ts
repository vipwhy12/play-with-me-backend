import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { AuthInfoDto } from './dto/auth-info.dto';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) { }

  async loginUser(user: AuthInfoDto) {
    return {
      accessToken: this.signToken(user, false),
      refreshToken: this.signToken(user, true),
    };
  }

  //🪙토큰발급
  signToken(user: AuthInfoDto, isRefreshToken: boolean) {
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

  async validateUser(user: AuthCredentialsDto): Promise<any> {
    const existingUser = await this.usersService.getUserByEmail(user.email);

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
