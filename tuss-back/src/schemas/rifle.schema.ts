import { Prop, Schema } from '@nestjs/mongoose';
import { Piece, PieceSchema } from './piece.schema';
import { Accessory, AccessorySchema } from './accessory.schema';

@Schema()
export class Rifle extends Piece {
  @Prop()
  type: Rifle.ERifleTypes;

  @Prop()
  fps: number;

  @Prop()
  rof: number;

  @Prop()
  range: number;

  @Prop()
  length: number;

  @Prop()
  weight: number;

  @Prop({ type: [AccessorySchema] })
  parts: Accessory[];
}

export const RifleSchema = SchemaFactory.createForClass(Rifle);
