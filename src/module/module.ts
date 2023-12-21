import { Module } from '@nestjs/common';
import { ListBatimentController } from '../controller/listBatiment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from "../config/MongooseConfigService";
import { ConfigModule } from "@nestjs/config";
import { BatimentService } from "../services/batiment.service";
import { BatimentSchema } from "../entities/batiment.schema";

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
  providers: [MongooseConfigService,BatimentService],
})
export class appModule {}
