import { Logger } from '@nestjs/common';
import {
  WebSocketServer,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  namespace: '/downloadprogress',
  cors: true,
})
export class DatasetsDownloadProgressGateway {
  
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('DatasetsDownloadProgressGateway');


  alertProgressDownload(data: any): void {
    this.server.emit('dataset_download_progress_event', { type: 'dataset_alert', data })
  }
}
