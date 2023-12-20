import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
  timestamps: true,
})
export class Batiment {
  @Prop()
  num: number;

  @Prop()
  hauteur: number;

  @Prop()
  position: number;

}
export const BatimentSchema = SchemaFactory.createForClass(Batiment);