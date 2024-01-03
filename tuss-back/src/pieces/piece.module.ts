import { Module } from '@nestjs/common';
import { PieceService } from './piece.service';
import { PieceController } from './piece.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Piece, PieceSchema } from 'src/schemas/pieces.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Piece.name, schema: PieceSchema }])],
  providers: [PieceService],
  controllers: [PieceController]
})
export class PieceModule {}
