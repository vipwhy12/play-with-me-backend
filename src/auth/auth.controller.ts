import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-suth.guard';
import { AuthRegister } from './dto/auth-register.dto';
import { ApiOperation } from '@nestjs/swagger';
import { TokenResponseDto } from './dto/auth-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @ApiOperation({ summary: '회원가입 API', description: '유저 생성' })
  async register(
    @Body() authRegister: AuthRegister,
  ): Promise<TokenResponseDto> {
    return await this.authService.registerWithEmail(authRegister);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: '로그인 API' })
  async login(@Request() req): Promise<TokenResponseDto> {
    const token = await this.authService.loginUser(req.user);
    return token;
  }
}
