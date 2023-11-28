import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Piece } from './pieces.schema'
import { Accessory, AccessorySchema } from './accessory.schema'
import { Airsoft } from '@hugolmty/shared-types'

@Schema()
export class Rifle extends Piece {
  @Prop()
  type: Airsoft.Rifle.ERifleTypes

  @Prop()
  fps: number

  @Prop()
  rof: number

  @Prop()
  range: number

  @Prop()
  length: number

  @Prop()
  weight: number

  @Prop({ type: [AccessorySchema] })
  parts: Accessory[]
}

export const RifleSchema = SchemaFactory.createForClass(Rifle)
