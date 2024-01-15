import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

  @Post('/generate/gpt/:prompt')
  generateText (
    @Body('prompt') prompt: string,
  ) {
    // eslint-disable-next-line no-console
    console.log({ prompt })
    return this.ScriapServices.generateText(prompt);
  }

  @Get('/generate/:prompt')
  generateImage (
    @Param('prompt') prompt: string,
  ) {
    return this.ScriapServices.generateImage(prompt);
  }
}
