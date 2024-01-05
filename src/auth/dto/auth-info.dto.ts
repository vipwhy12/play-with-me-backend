import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MaxLength } from 'class-validator';

export class AuthInfoDto {
  @IsNumber()
  @ApiProperty()
  id: number;

  @IsString()
  @MaxLength(320)
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  name: string;
}
