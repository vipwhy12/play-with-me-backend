import { IsNumber, IsString, MaxLength } from 'class-validator';

export class AuthInfoDto {
  @IsNumber()
  id: number;

  @IsString()
  @MaxLength(320)
  email: string;

  @IsString()
  name: string;
}
