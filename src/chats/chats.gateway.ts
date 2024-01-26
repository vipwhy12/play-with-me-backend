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
import { ChatsModel } from './chats.entity';

@WebSocketGateway(80, {
  // ✨ 웹 소켓 네임스페이스를 'chats'로 정의
  //클라이언트에서는 ws://localhost:80/chat로 연결
  namespace: 'chat',
})
export class ChatsGateway implements OnGatewayConnection {
  constructor(private readonly chatsService: ChatsService) {}

  // WebSocket 서버 객체를 주입받을 수 있도록 설정
  @WebSocketServer()
  server: Server;

  //소켓과 연결 시, 실행되는 함수
  handleConnection(socket: Socket) {
    console.log(`🎉 on connect called : ${socket.id}`);
    socket.emit('hello_from_server', `🎉 on connect called : ${socket.id}`);
  }

  // 'send_message' 이벤트를 구독하고 클라이언트로부터 메시지를 수신할 때 호출되는 메서드
  @SubscribeMessage('send_message')
  sendMessage(
    @MessageBody() data: { channel: string; message: string }, // 메시지와 채팅 ID를 받아옵니다.
  ) {
    console.log(`${data.channel}에 ${data.message}가 갈 예정`);
    this.server.in(data.channel).emit('receive_message', data.message);
  }

  // 'enter_chat' 이벤트를 구독하고 클라이언트가 특정 채팅에 참여할 때 호출되는 메서드
  @SubscribeMessage('enter_chat')
  enterChat(
    @ConnectedSocket() socket: Socket,
    @MessageBody() chat: ChatsModel,
  ) {
    socket.join(chat.channel);
  }
}
