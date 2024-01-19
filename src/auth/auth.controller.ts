import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-suth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const token = await this.authService.loginUser(req.user);
    return token;
  }
}
