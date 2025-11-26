import { Module } from '@nestjs/common';
import { RoomsGateway } from './rooms/rooms.gateway';
import { RoomsService } from './rooms/rooms.service';

@Module({
  imports: [],
  providers: [RoomsGateway, RoomsService],
})
export class AppModule {}