import {
  OnGatewayConnection,
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({
  namespace: 'chats', //✨수신 대기: ws://localhost:8080/chats
})
export class ChatsGateway implements OnGatewayConnection {
  handleConnection(socket: Socket) {
    console.log(`🎉 on connect called : ${socket.id}`);
  }

  //'send_message를 구독하고 사용자에게 응답'
  @SubscribeMessage('send_message')
  sendMessage(@MessageBody() data: string) {
    console.log(data);
  }
}
