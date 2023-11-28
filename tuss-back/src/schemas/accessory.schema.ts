import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Piece } from './pieces.schema';
import { Parts } from '@hugolmty/shared-types';

@Schema()
export class Accessory extends Piece {
  @Prop()
  type: Parts.EPartsTypes;

  @Prop()
  part: Parts.EParts;
}

export const AccessorySchema = SchemaFactory.createForClass(Accessory);
