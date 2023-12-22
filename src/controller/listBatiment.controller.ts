import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Logger,
  BadRequestException,
  NotFoundException, InternalServerErrorException
} from "@nestjs/common";
import { OrmListbatimentService } from "../services/orm.listbatiment.service";
import { hauteurListdto } from "../dto/hauteurtList.dto";
import { ApiBody, ApiResponse } from "@nestjs/swagger";
import { listBatimentdto } from "../dto/listBatement.dto";


@Controller('ArchiTekt')
export class ListBatimentController {
  private readonly logger = new Logger(ListBatimentController.name);

  constructor(private readonly batimentService: OrmListbatimentService) {}

  @Get('allListBatiment')
  @ApiResponse({ status: 200, description: 'Successfully retrieved all ListBatiments',
    type: listBatimentdto, isArray: true })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async getAllListBatiments(): Promise<listBatimentdto[]> {
    try {
      const result= await this.batimentService.findAll();
      this.logger.log('Successfully  retrieving ListBatiments.');
      return result
    } catch (error) {
      this.logger.error(`Error while retrieving all ListBatiments: ${error.message}`);
      throw new Error('An error occurred while retrieving ListBatiments.');
    }
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
  @ApiResponse({ status: 201, description: 'ListBatiment created successfully', type: listBatimentdto })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async createListBatiments(@Body() listHeight:hauteurListdto): Promise<listBatimentdto> {
    try {
      const result= await this.batimentService.create(listHeight);
      this.logger.log('Successfully creating ListBatiments.');
      return result
    } catch (error) {
      this.logger.error(`Error while creating ListBatiment: ${error.message}`);

      if (error instanceof BadRequestException) {
        throw new BadRequestException('Invalid request. Please check your input.');
      } else if (error instanceof NotFoundException) {
        throw new NotFoundException('ListBatiment not found.');
      } else {
        throw new InternalServerErrorException('An unexpected error occurred while creating ListBatiment.');
      }
    }
  }

  @Get('ListBatiment/:id')
  @ApiResponse({ status: 200, description: 'Successfully retrieved ListBatiment by ID', type: listBatimentdto })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'ListBatiment not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async getListBatiments(@Param('id') id: string,): Promise<listBatimentdto> {
    try {
      const result=await this.batimentService.findById(id);
      this.logger.log('Successfully finding ListBatiment by ID.');
      return result;
    } catch (error) {
      this.logger.error(`Error while retrieving ListBatiment by ID: ${error.message}`);
      if (error instanceof NotFoundException) {
        throw new NotFoundException('ListBatiment not found.');
      } else {
        throw new InternalServerErrorException('An error occurred while retrieving ListBatiment by ID.');
      }
    }
  }

  @Get('ListBatiment/Num/:num')
  @ApiResponse({ status: 200, description: 'Successfully retrieved ListBatiment by num', type: listBatimentdto })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'ListBatiment not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async getListBatimentsByNum(@Param('num') num: number,): Promise<listBatimentdto> {
    try {
      const result= await this.batimentService.findByNum(num);
      this.logger.log('Successfully finding ListBatiment by NUM.');
      return result;
    } catch (error) {
      this.logger.error(`Error while retrieving ListBatiment by num: ${error.message}`);
      if (error instanceof NotFoundException) {
        throw new NotFoundException('ListBatiment not found.');
      } else {
        throw new InternalServerErrorException('An error occurred while retrieving ListBatiment by num.');
      }
    }
  }

  @Delete('ListBatiment/Num/:num')
  @ApiResponse({ status: 200, description: 'ListBatiment deleted successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'ListBatiment not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async deleteListBatiments(@Param('num') num: number){
    try {
      const result= this.batimentService.delete(num);
      this.logger.log('Successfully delete ListBatiment by NUM.');
      return result;
    } catch (error) {
      this.logger.error(`Error while deleting ListBatiment by num: ${error.message}`);
      if (error instanceof NotFoundException) {
        throw new NotFoundException('ListBatiment not found.');
      } else {
        throw new InternalServerErrorException('An error occurred while deleting ListBatiment by num.');
      }
    }
  }

  @Put('updateListBatiments/:num')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        buildingsHeightList: {
          type: 'Array',
          description: 'buildingsHeightList',
          example: [1,0,3],
          required: ['true']
        },
      }
    }
  })
  @ApiResponse({ status: 200, description: 'ListBatiment updated successfully', type: listBatimentdto })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'ListBatiment not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async updateListBatiments(@Param('num') num: number, @Body() newdto: hauteurListdto): Promise<listBatimentdto> {
    try {
      const result= await this.batimentService.updateByNum(num, newdto);
      this.logger.log('Successfully update ListBatiment.');
      return result
    } catch (error) {
      this.logger.error(`Error while updating ListBatiment by num: ${error.message}`);
      if (error instanceof NotFoundException) {
        throw new NotFoundException('ListBatiment not found.');
      } else {
        throw new InternalServerErrorException('An error occurred while updating ListBatiment by num.');
      }
    }
  }

}
