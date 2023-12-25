import { ApiProperty } from "@nestjs/swagger";

export class listBatimentdto {
  @ApiProperty({example:123})
  num: number;
  @ApiProperty({example:[1,2,3]})
  listHauteur: number[];

  @ApiProperty({example:0})
  maxsurfaceEau: number;


}