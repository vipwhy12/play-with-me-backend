import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   *  jwt-strategy의 경우 Passport는 먼저 JWT의 서명을 확인하고 JSON을 디코딩
   *  validate()디코딩된 JSON을 단일 매개변수로 전달하는 메서드를 호출합니다.
   *  JWT 서명이 작동하는 방식에 따라 우리는 이전에 서명하여 유효한 사용자에게 발급한 유효한 토큰을 받고 있음을 보장
   */

  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //JWT추출
      ignoreExpiration: false, //JWT가 만료인지 확인 토큰이 만료시, 401 Unauthorized응답이 전송
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
