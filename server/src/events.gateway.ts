import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  
  private clients: Socket[] = [];

  handleConnection(client: Socket) {
    this.clients.push(client);

    this.server.emit('clientsCount', this.clients.length);
  }

  handleDisconnect(client: Socket) {
    this.clients = this.clients.filter(c => c.id !== client.id);

    this.server.emit('clientsCount', this.clients.length);
  }
}