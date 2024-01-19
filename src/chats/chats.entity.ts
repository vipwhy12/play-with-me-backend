import { UsersModel } from 'src/users/user.entity';
import {
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ChatsModel {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToMany(() => UsersModel, (user) => user.chats)
  users: UsersModel[];
}
