import { BaseEntity } from 'src/core/base.entity';
import { ChatsModel } from 'src/chats/chats.entity';
import { Column, Entity, JoinTable, ManyToMany, Unique } from 'typeorm';

@Entity()
@Unique(['email'])
export class UsersModel extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => ChatsModel, (chat) => chat.users)
  @JoinTable()
  chats: ChatsModel[];
}
