import { Module } from '@nestjs/common';
import { HeroClientModule } from './hero-client/hero.client.module';
import { HeroServerModule } from './hero-server/hero.module';

@Module({
  imports: [HeroClientModule, HeroServerModule],
})
export class AppModule {}
