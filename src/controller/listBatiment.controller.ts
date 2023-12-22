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
      return await this.batimentService.findAll();
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
      return await this.batimentService.create(listHeight);
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
      return await this.batimentService.findById(id);
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
      return await this.batimentService.findByNum(num);
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
      await this.batimentService.delete(num);
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
      return await this.batimentService.updateByNum(num, newdto);
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
