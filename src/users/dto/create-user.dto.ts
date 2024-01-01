import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  @MinLength(5)
  @MaxLength(320)
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(50)
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: '💥 비밀번호는 영어와 숫자만 가능합니다',
  })
  readonly password: string;
}
