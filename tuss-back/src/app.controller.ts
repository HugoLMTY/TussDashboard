import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  async places(): Promise<{ field: string; date: string; places: number }[]> {
    const places = this.appService.getPlaces();

    return places;
  }
}
