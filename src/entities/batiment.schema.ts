import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
  timestamps: true,
})
export class listBatiment {
  @Prop()
  num: number;

  @Prop()
  listHauteur: number[];

  @Prop()
  maxsurfaceEau: number;






}
export const BatimentSchema = SchemaFactory.createForClass(listBatiment);