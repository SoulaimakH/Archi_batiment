import { Logger, Module } from "@nestjs/common";
import { ListBatimentController } from '../controller/listBatiment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from "../config/MongooseConfigService";
import { ConfigModule } from "@nestjs/config";
import { OrmListbatimentService } from "../services/orm.listbatiment.service";
import { BatimentSchema } from "../entities/batiment.schema";
import { CalculeMaxSurfaceEauService } from "../services/calculeMaxSurfaceEau.service";

let envFilePath = '.env.dev';
if(process.env.ENVIRONMENT ==='prod')
  envFilePath='.env.prod';

console.log(`Archi Tekt Running in ${process.env.ENVIRONMENT}`);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: envFilePath,
      isGlobal: true,
    }),
    MongooseModule.forFeature([{ name: 'listBatiment', schema: BatimentSchema }]),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService,
    }),
  ],
  controllers: [ListBatimentController],
  providers: [MongooseConfigService,OrmListbatimentService,CalculeMaxSurfaceEauService,Logger],
})
export class appModule {}
