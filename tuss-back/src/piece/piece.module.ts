import { Module } from '@nestjs/common';
import { PieceService } from './piece.service';
import { PieceController } from './piece.controller';

@Module({
  providers: [PieceService],
  controllers: [PieceController]
})
export class PieceModule {}
