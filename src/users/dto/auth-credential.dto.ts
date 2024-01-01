import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(5)
  @MaxLength(320)
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(50)
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: '💥 비밀번호는 영어와 숫자만 가능합니다',
  })
  password: string;
}
