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
    this.roomsService.leaveAllRooms(client.id);
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('createRoom')
  handleCreateRoom(client: Socket, roomId: string) {
    this.roomsService.createRoom(roomId);
    client.emit('roomCreated', roomId);
    this.updateRoomsList();
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, roomId: string) {
    this.roomsService.joinRoom(roomId, client.id);
    client.join(roomId);
    
    client.emit('joinedRoom', roomId);
    
    this.server.to(roomId).emit('roomUsers', {
      roomId,
      users: this.roomsService.getRoomClients(roomId)
    });
    
    this.updateRoomsList();
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, roomId: string) {
    this.roomsService.leaveRoom(roomId, client.id);
    client.leave(roomId);
    
    client.emit('leftRoom', roomId);
    
    this.server.to(roomId).emit('roomUsers', {
      roomId,
      users: this.roomsService.getRoomClients(roomId)
    });
    
    this.updateRoomsList();
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: { roomId: string, message: string }) {
    this.server.to(payload.roomId).emit('message', {
      from: client.id,
      message: payload.message,
      roomId: payload.roomId
    });
  }

  private updateRoomsList() {
    this.server.emit('roomsList', this.roomsService.getRooms());
  }
}