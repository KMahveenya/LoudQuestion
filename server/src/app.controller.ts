import { Controller, Get } from '@nestjs/common';
import { EventsGateway } from './events.gateway';

@Controller()
export class AppController {
  constructor(private readonly eventsGateway: EventsGateway) {}

  @Get()
  getInfo() {
    return { 
      message: 'WebSocket server is running',
      
    };
  }
}