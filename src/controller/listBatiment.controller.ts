import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { BatimentService } from "../services/batiment.service";
import {  listBatiment } from "../entities/batiment.schema";
import { hauteurListdto } from "../dto/hauteurtList.dto";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";


@Controller('ArchiTekt')
export class ListBatimentController {
  constructor(private readonly batimentService: BatimentService) {}

  @Get('allListBatiment')
  async getAllListBatiments(): Promise<listBatiment[]> {
    return this.batimentService.findAll();
  }

  @Post('addListBatiment')
  @ApiBody({
    schema: {
       type: 'object',
       properties: {
         buildingsHeightList: {
           type: 'Array',
           description: 'buildingsHeightList',
           example: [1,2,3],
           required: ['true']
         },
       }
     }
   })
  @ApiResponse({ status: 201, description: 'Item created successfully' })
  async createListBatiments(@Body() listHeight:hauteurListdto): Promise<listBatiment> {
    return this.batimentService.create(listHeight);
  }

  @Get('ListBatiment/:id')
  async getListBatiments(@Param('id') id: string,): Promise<listBatiment> {
    return this.batimentService.findById(id);
  }

  @Get('ListBatiment/Num/:num')
  async getListBatimentsByNum(@Param('num') num: number,): Promise<listBatiment> {
    return this.batimentService.findByNum(num);
  }

  @Delete('ListBatiment/Num/:num')
  async deleteListBatiments(@Body() num:number){
    return this.batimentService.delete(num);
  }

  @Put('updateListBatiments/:id')
  async updateListBatiments(@Param('num') num: number, @Body() newdto: hauteurListdto): Promise<listBatiment> {
    return this.batimentService.updateByNum(num, newdto);
  }



}
