import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomsService } from './rooms.service';

@WebSocketGateway({
  cors: {
    origin: "http://localhost:5173",
    credentials: true
  }
})
export class RoomsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private readonly roomsService: RoomsService) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.roomsService.leaveRoom(client.id);
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('getRooms')
  handleGetRooms(client: Socket) {
    this.updateRoomsList();
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, data: Object) {
    let roomId = data['roomId'];
    if (roomId == null) {
      roomId = this.roomsService.createRoom(client.id, data['roomname']);
    }
    const owner = this.roomsService.joinRoom(roomId, data['username'], client.id);
    client.join(roomId);

    this.server.to(roomId).emit('roomUsers', this.roomsService.getRoomClients(roomId));
    this.server.to(roomId).emit('roomOwner', owner);
    
    this.updateRoomsList();
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket) {
    const roomId = this.roomsService.leaveRoom(client.id);
    client.leave(roomId);
    
    this.server.to(roomId).emit('roomUsers', this.roomsService.getRoomClients(roomId));
    
    this.updateRoomsList();
  }

  private updateRoomsList() {
    this.server.emit('roomsList', this.roomsService.getRooms());
  }
}