import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Piece } from './pieces.schema';
// import { Parts } from 'shared-types';

@Schema()
export class Accessory extends Piece {
  @Prop()
  // type: Parts.EPartsTypes;
  type: string;

  @Prop()
  // part: Parts.EParts;
  part: string;
}

export const AccessorySchema = SchemaFactory.createForClass(Accessory);
