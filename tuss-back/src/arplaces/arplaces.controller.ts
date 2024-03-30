import { Body, Controller, Get, Post } from '@nestjs/common';
import { ARPlacesService } from './arplaces.service';

@Controller('arplaces')
export class ARPlacesController {
  constructor(
    private readonly ARPlaceService: ARPlacesService
  ) {}


  @Get()
  getHello(): string {
    return this.ARPlaceService.getHello();
  }

  @Post()
  async fetch (
    @Body('params') params: { date: string; fields: string[] },
  ) {
    return await this.ARPlaceService.fetch(params);
  }
}
