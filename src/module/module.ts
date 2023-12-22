import { Module } from '@nestjs/common';
import { ListBatimentController } from '../controller/listBatiment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from "../config/MongooseConfigService";
import { ConfigModule } from "@nestjs/config";
import { OrmListbatimentService } from "../services/orm.listbatiment.service";
import { BatimentSchema } from "../entities/batiment.schema";
import { CalculeMaxSurfaceEauService } from "../services/calculeMaxSurfaceEau.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forFeature([{ name: 'listBatiment', schema: BatimentSchema }]),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService,
    }),
  ],
  controllers: [ListBatimentController],
  providers: [MongooseConfigService,OrmListbatimentService,CalculeMaxSurfaceEauService],
})
export class appModule {}
