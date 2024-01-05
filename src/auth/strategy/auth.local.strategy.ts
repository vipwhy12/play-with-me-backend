import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email', //username : 키 이름 변경
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = {
      email,
      password,
    };
    const existingUser = await this.authService.validateUser(user);

    return existingUser;
  }
}
