import { IsNumber, IsString } from 'class-validator';

export class ChatRegisterDto {
  @IsNumber({}, { each: true })
  userIds: number[];

  @IsString()
  gameName: string;

  @IsString()
  gameDescription: string;

  @IsString()
  chatName: string;

  @IsNumber()
  numberOfChat: number;
}
