import { Module } from '@nestjs/common';
import { RiflesService } from './rifles.service';
import { RiflesController } from './rifles.controller';

@Module({
  providers: [RiflesService],
  controllers: [RiflesController]
})
export class RiflesModule {}
