import { Controller, Get, Param } from '@nestjs/common';
import { HeroClientService } from './hero.client.service';

@Controller('/hero')
export class HeroClientController {
  constructor(private readonly heroClientService: HeroClientService) {}

  @Get('/:id')
  getHeroById(@Param('id') id: number): Promise<string> {
    return this.heroClientService.getHero(id);
  }
}
