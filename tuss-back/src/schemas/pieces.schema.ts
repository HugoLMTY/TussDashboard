import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
