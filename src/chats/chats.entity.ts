import { UsersModel } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ChatsModel {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  gameName: string;

  @Column()
  gameDescription: string;

  @Column()
  chatName: string;

  @Column()
  numberOfChat: number;

  @Column()
  @Generated('uuid')
  channel: string;

  @ManyToMany(() => UsersModel, (user) => user.chats)
  users: UsersModel[];
}
