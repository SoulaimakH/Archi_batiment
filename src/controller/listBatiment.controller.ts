import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { AppService } from '../app.service';
import { BatimentService } from "../services/batiment.service";
import {  listBatiment } from "../entities/batiment.schema";
import { hauteurListdto } from "../dto/hauteurtList.dto";

@Controller('ArchiTeck')
export class ListBatimentController {
  constructor(private readonly batimentService: BatimentService) {}

  @Get('allListBatiment')
  async getAllListBatiments(): Promise<listBatiment[]> {
    return this.batimentService.findAll();
  }

  @Post('addListBatiment')
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
