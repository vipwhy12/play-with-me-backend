import {
  OnGatewayConnection,
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatsService } from './chats.service';

@WebSocketGateway({
  // ✨ 웹 소켓 네임스페이스를 'chats'로 정의
  //클라이언트에서는 ws://localhost:8080/chats로 연결
  namespace: 'chats',
})
export class ChatsGateway implements OnGatewayConnection {
  constructor(private readonly chatsService: ChatsService) {}

  @WebSocketServer() // WebSocket 서버 객체를 주입받을 수 있도록 설정
  server: Server;

  handleConnection(socket: Socket) {
    console.log(`🎉 on connect called : ${socket.id}`);
  }

  // 'send_message' 이벤트를 구독하고 클라이언트로부터 메시지를 수신할 때 호출되는 메서드
  @SubscribeMessage('send_message')
  sendMessage(
    @MessageBody() message: { message: string; chatId: number }, // 메시지와 채팅 ID를 받아옵니다.
    @ConnectedSocket() socket: Socket, // 연결된 소켓 객체를 주입
  ) {
    socket
      .to(message.chatId.toString())
      .emit('receive_message', message.message);
  }

  // 'enter_chat' 이벤트를 구독하고 클라이언트가 특정 채팅에 참여할 때 호출되는 메서드
  @SubscribeMessage('enter_chat')
  enterChat(
    @MessageBody() data: number[], //방의 chat ID 들을 list로 받는다
    @ConnectedSocket() socket: Socket, //연결된 소켓을 주입
  ) {
    // 받아온 채팅 ID들을 이용하여 클라이언트를 해당 방에 참여
    for (const chatId of data) {
      socket.join(chatId.toString());
    }
  }
}
