import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  app.enableCors({
    origin: "http://localhost:5173",
    credentials: true
  });
  
  app.useWebSocketAdapter(new IoAdapter(app));
  
  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000');
}
bootstrap();