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

    this.server.to(roomId).emit('roomUsers', roomId, this.roomsService.getRoomClients(roomId));
    this.server.to(roomId).emit('roomOwner', owner);
    
    this.updateRoomsList();
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket) {
    const roomId = this.roomsService.leaveRoom(client.id);
    client.leave(roomId);
    
    this.server.to(roomId).emit('roomUsers', roomId, this.roomsService.getRoomClients(roomId));
    
    this.updateRoomsList();
  }

  @SubscribeMessage('userRoles')
  handleUserRoles(client: Socket, data: Object) {
    const roomId = data['roomId'];
    const asker = data['asker'];
    const reader = data['reader'];
    this.roomsService.setRoles(roomId, asker, reader);
    this.server.to(roomId).emit('roles', asker, reader);
  }

  @SubscribeMessage('questionAndAnswer')
  handleQuestionAndAnswer(client: Socket, data: Object) {
    const roomId = data['roomId'];
    const question = data['question'];
    const answer = data['answer'];
    this.roomsService.setQuestionAndAnswer(roomId, question, answer);
    this.server.to(roomId).emit('gameReady');
  }

  @SubscribeMessage('startGame')
  handleStartGame(client: Socket, data: Object) {
    const roomId = data['roomId'];
    const reader = this.roomsService.getReader(roomId);
    const question = this.roomsService.getQuestion(roomId);
    this.server.to(reader).emit('question', question);
    this.server.to(roomId).emit('gameStart');
  }

  @SubscribeMessage('enterAnswer')
  handleEnterAnswer(client: Socket, data: Object) {
    const roomId = data['roomId'];
    const allAnswers = this.roomsService.incrementAnswersCount(roomId);
    if (allAnswers) {
      const reader = this.roomsService.getReader(roomId);
      const asker = this.roomsService.getAsker(roomId);
      const answer = this.roomsService.getAnswer(roomId);
      this.server.to(reader).emit('answer', answer);
      this.server.to(asker).emit('gameEnd');
    }
  }

  @SubscribeMessage('endGame')
  handleEndGame(client: Socket, data: Object) {
    const roomId = data['roomId'];
    this.server.to(roomId).emit('clearInfo');
    this.roomsService.clearInfo(roomId);
  }

  private updateRoomsList() {
    this.server.emit('roomsList', this.roomsService.getRooms());
  }
}