import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type PieceDocument = HydratedDocument<Piece>;

@Schema()
export class Piece extends Document {
  @Prop()
  img: string;

  @Prop()
  name: string;

  @Prop()
  link: string;

  @Prop()
  brand: string;

  @Prop()
  description: string;
}

export const PieceSchema = SchemaFactory.createForClass(Piece);
