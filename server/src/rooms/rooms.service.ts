import { Injectable } from '@nestjs/common';

interface roomInfo {
  name: string,
  users: Map<string, string>
  ownerClient: string | null;
  asker: string | null;
  reader: string | null;
  question: string | null;
  answer: string | null;
  answersCount: number;
}

@Injectable()
export class RoomsService {
  private rooms: Map<string, roomInfo> = new Map();

  createRoom(clientId: string, roomName: string): string {
    const roomId = this.generateRoomId();
    this.rooms.set(roomId, {name: roomName, users: new Map(), ownerClient: clientId, asker: null, reader: null, question: null, answer: null, answersCount: 0});
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

  getReader(roomId: string): string {
    const room = this.rooms.get(roomId);
    if (room) {
      return room.reader || '';
    }
    return '';
  }

  getAsker(roomId: string): string {
    const room = this.rooms.get(roomId);
    if (room) {
      return room.asker || '';
    }
    return '';
  }

  getQuestion(roomId: string): string {
    const room = this.rooms.get(roomId);
    if (room) {
      return room.question || '';
    }
    return '';
  }

  getAnswer(roomId: string): string {
    const room = this.rooms.get(roomId);
    if (room) {
      return room.answer || '';
    }
    return '';
  }

  incrementAnswersCount(roomId: string): boolean {
    const room = this.rooms.get(roomId);
    if (room) {
      room.answersCount++;
      return room.answersCount == room.users.size - 1;
    }
    return false;
  }

  clearInfo(roomId: string): void {
    const room = this.rooms.get(roomId);
    if (room) {
      room.asker = null;
      room.reader = null;
      room.answer = null;
      room.question = null;
      room.answersCount = 0;
    }
  }

  private generateRoomId(): string {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }
}