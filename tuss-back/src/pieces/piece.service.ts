import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Piece, PieceDocument } from 'src/schemas/pieces.schema';

@Injectable()
export class PieceService {
  constructor(
    @InjectModel(Piece.name) private pieceModel: Model<PieceDocument>
  ) {}

  async create(piece: Piece): Promise<Piece> {
    const createdPiece = new this.pieceModel(piece);
    return await createdPiece.save();
  }

  async findAll(): Promise<Piece[]> {
    return this.pieceModel.find().exec();
  }
}
