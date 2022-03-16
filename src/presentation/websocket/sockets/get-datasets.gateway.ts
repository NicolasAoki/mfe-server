import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  namespace: 'datasets',
  cors: true,
})
export class GetDatasetsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('GetDatasetsGateway');
  afterInit(server: Server) {
    this.logger.log('initialized!');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`connected ${client.id}`)
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`disconnected ${client.id}`)
  }

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, text: string): WsResponse<string> {
    // client.emit('msgToClient', text)
    return {
      event: 'msgToClient',
      data: 'hello wworld!',
    }
  }
}
