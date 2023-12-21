import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from "@nestjs/swagger";
import { appModule } from "./module/module";

async function bootstrap() {
  const app = await NestFactory.create(appModule);

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
