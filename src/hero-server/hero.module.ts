import { Module } from '@nestjs/common';
import { HeroServerController } from './hero.server.controller';

@Module({ controllers: [HeroServerController] })
export class HeroServerModule {}
