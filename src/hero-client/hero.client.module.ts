import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { HeroClientController } from './hero.client.controller';
import { HeroClientService } from './hero.client.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'HERO_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:3333',
          package: 'hero',
          protoPath: join(__dirname, '../hero-server/hero.proto'),
        },
      },
    ]),
  ],
  controllers: [HeroClientController],
  providers: [HeroClientService],
})
export class HeroClientModule {}
