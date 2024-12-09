import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      // default port 5000
      url: '0.0.0.0:3333',
      package: 'hero',
      protoPath: join(__dirname, 'hero-server/hero.proto'),
    },
  });
  // 하나의 서버로 테스트를 위해 2개의 서버(listener?)를 동시에 실행
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
