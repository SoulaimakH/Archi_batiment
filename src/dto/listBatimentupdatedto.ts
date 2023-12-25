import { ApiProperty } from "@nestjs/swagger";

export class listBatimentypdatedto {
  @ApiProperty({example:103})
  num: number;
  @ApiProperty({example:[1,0,3]})
  listHauteur: number[];

  @ApiProperty({example:1})
  maxsurfaceEau: number;


}