import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from "@nestjs/swagger";
import { appModule } from "./module/module";
import { instance } from "./logger/winston.logger";
import { WinstonModule } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(appModule, {
    logger: WinstonModule.createLogger({
      instance: instance,
    }),
  });

  const config = new DocumentBuilder()
    .setTitle('Archi TEKT Batiment API')
    .setDescription('API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'API Archi TEKT Batiment ',
  };
  SwaggerModule.setup('', app, document, customOptions);


  await app.listen(3000);
}
bootstrap();
