import { Injectable } from '@nestjs/common';

interface roomInfo {
  name: string,
  users: Map<string, string>
  ownerClient: string | null;
  asker: string | null;
  reader: string | null;
  question: string | null;
  answer: string | null;
}

@Injectable()
export class RoomsService {
  private rooms: Map<string, roomInfo> = new Map();

  createRoom(clientId: string, roomName: string): string {
    const roomId = this.generateRoomId();
    this.rooms.set(roomId, {name: roomName, users: new Map(), ownerClient: clientId, asker: null, reader: null, question: null, answer: null});
    return roomId;
  }

  joinRoom(roomId: string, username: string, clientId: string): string | null {
    this.rooms.get(roomId)?.users.set(clientId, username);
    return this.rooms.get(roomId)?.ownerClient || '';
  }

  leaveRoom(clientId: string): string {
    for (const [roomId, roomInfo] of this.rooms.entries()) {
        if (roomInfo.users.has(clientId)) {
            roomInfo.users.delete(clientId);
            
            if (roomInfo.users.size === 0) {
                this.rooms.delete(roomId);
            }
            
            return roomId;
        }
    }

    return '';
  }

  getRoomClients(roomId: string): Object {
    let room = this.rooms.get(roomId);

    return this.rooms.has(roomId) && room?.users
      ? Object.fromEntries(room.users) 
      : {};
  }

  getRooms(): Object {
    let roomNames: Object = {};
    for (let [key, roomInfo] of this.rooms.entries()) {
      roomNames[key] = roomInfo.name;
    }
    return roomNames;
  }

  setRoles(roomId: string, asker: string, reader: string): void {
    const room = this.rooms.get(roomId);
    if (room) {
      room.asker = asker;
      room.reader = reader;
    }
  }

  setQuestionAndAnswer(roomId: string, question: string, answer: string): void {
    const room = this.rooms.get(roomId);
    if (room) {
      room.question = question;
      room.answer = answer;
    }
  }

  private generateRoomId(): string {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }
}