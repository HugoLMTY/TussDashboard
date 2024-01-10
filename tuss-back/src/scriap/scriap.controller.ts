import { Controller, Get, Param } from '@nestjs/common';
import { ScriapService } from './scriap.service';

@Controller('scriap')
export class ScriapController {
  constructor(
    private readonly ScriapServices: ScriapService
  ) {}


  @Get()
  getHello(): string {
    return this.ScriapServices.getHello();
  }

  @Get('/generate/:prompt')
  generateImage (
    @Param('prompt') prompt: string,
  ) {
    return this.ScriapServices.generateImage(prompt);
  }
}
