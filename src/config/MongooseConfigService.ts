import { Injectable } from '@nestjs/common';
import { MongooseOptionsFactory, MongooseModuleOptions } from '@nestjs/mongoose';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  createMongooseOptions(): MongooseModuleOptions {
    if(process.env.ENVIRONMENT==='prod')
    {
      const username=process.env.DB_USERNAME
      const password=process.env.DB_PASSWORD
      return {
        uri:`mongodb+srv://${username}:${password}@architekt.udahwse.mongodb.net/?retryWrites=true&w=majority`
      }
    }
    const mongoHost = process.env.DB_HOST
    const mongoPort = process.env.DB_PORT
    const mongoDatabase = process.env.DATABASE
    return {
      uri:`mongodb://${mongoHost}:${mongoPort}/${mongoDatabase}`,
    };
  }
}
