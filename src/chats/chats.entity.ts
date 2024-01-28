import { BaseEntity } from 'src/core/base.entity';
import { UsersModel } from 'src/users/user.entity';
import { Column, Entity, Generated, ManyToMany } from 'typeorm';

@Entity()
export class ChatsModel extends BaseEntity {
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
