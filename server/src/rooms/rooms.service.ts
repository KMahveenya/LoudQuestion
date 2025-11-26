import { Injectable } from '@nestjs/common';

@Injectable()
export class RoomsService {
  private rooms: Map<string, Set<string>> = new Map();

  createRoom(roomId: string): void {
    if (!this.rooms.has(roomId)) {
      this.rooms.set(roomId, new Set());
    }
  }

  joinRoom(roomId: string, clientId: string): void {
    this.createRoom(roomId);
    this.rooms.get(roomId)?.add(clientId);
  }

  leaveRoom(roomId: string, clientId: string): void {
    if (this.rooms.has(roomId)) {
      this.rooms.get(roomId)?.delete(clientId);
      
      if (this.rooms.get(roomId)?.size === 0) {
        this.rooms.delete(roomId);
      }
    }
  }

  leaveAllRooms(clientId: string): void {
    this.rooms.forEach((clients, roomId) => {
      if (clients.has(clientId)) {
        this.leaveRoom(roomId, clientId);
      }
    });
  }

  getRoomClients(roomId: string): string[] {
    let room = this.rooms.get(roomId);

    return this.rooms.has(roomId) && room
      ? Array.from(room) 
      : [];
  }

  getRooms(): string[] {
    return Array.from(this.rooms.keys());
  }
}