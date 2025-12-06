import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: "*",
    credentials: true,
  });

  app.useWebSocketAdapter(new IoAdapter(app));

  const port = process.env.PORT || 3000;

  await app.listen(port, '0.0.0.0');
  console.log(`Server started on port: ${port}`);
}

bootstrap();
