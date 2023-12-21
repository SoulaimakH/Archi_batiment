import { NestFactory } from '@nestjs/core';
import { Module } from './module/module';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(Module);

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
