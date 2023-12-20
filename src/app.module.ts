import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from "./MongooseConfigService";
import { ConfigModule } from "@nestjs/config";
import { BatimentService } from "./entities/batiment.service";
import { BatimentSchema } from "./entities/batiment.schema";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forFeature([{ name: 'Batiment', schema: BatimentSchema }]),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService,
    }),
  ],
  controllers: [AppController],
  providers: [AppService,MongooseConfigService,BatimentService],
})
export class AppModule {}
