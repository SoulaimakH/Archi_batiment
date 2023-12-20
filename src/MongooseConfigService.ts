// mongo.MongooseConfigService.ts

import { Injectable } from '@nestjs/common';
import { MongooseOptionsFactory, MongooseModuleOptions } from '@nestjs/mongoose';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  createMongooseOptions(): MongooseModuleOptions {
    const mongoHost = process.env.DB_HOST
    const mongoPort = process.env.DB_PORT
    const mongoDatabase = process.env.DATABASE
    return {
      uri:`mongodb://${mongoHost}:${mongoPort}/${mongoDatabase}`,
    };
  }
}
