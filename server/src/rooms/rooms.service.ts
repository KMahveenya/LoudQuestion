import { Injectable } from '@nestjs/common';

interface User {
  id: string,
  username: string
}

interface roomInfo {
  name: string,
  users: Map<string, string>
}

@Injectable()
export class RoomsService {
  private rooms: Map<string, roomInfo> = new Map();

  createRoom(roomName: string): string {
    const roomId = this.generateRoomId();
    this.rooms.set(roomId, {name: roomName, users: new Map()});
    return roomId;
  }

  joinRoom(roomId: string, username: string, clientId: string): void {
    this.rooms.get(roomId)?.users.set(clientId, username);
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

  private generateRoomId(): string {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }
}