import { Body, Controller, Get, Post } from "@nestjs/common";
import { AppService } from './app.service';
import { BatimentService } from "./entities/batiment.service";
import { Batiment } from "./entities/batiment.schema";

@Controller('batiment')
export class AppController {
  constructor(private readonly batimentService: BatimentService) {}


  @Get()
  async getAllBooks(): Promise<Batiment[]> {
    return this.batimentService.findAll();
  }
  @Post()
  async createBook(
    @Body()
      Batiment: Batiment,): Promise<Batiment> {
    return this.batimentService.create(Batiment);
  }
  /*@Post()
  async createBook(
    @Body()
      Batiment: CreateBookDto,): Promise<Batiment> {
    return this.batimentService.create(Batiment);
  }

  @Get(':id')
  async getBook(
    @Param('id')
      id: string,
  ): Promise<Book> {
    return this.batimentService.findById(id);
  }

  @Put(':id')
  async updateBook(
    @Param('id')
      id: string,
    @Body()
      book: UpdateBookDto,
  ): Promise<Book> {
    return this.batimentService.updateById(id, book);
  }
*/

}
