import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'dotenv';
import { AppModule } from '../config/app';

async function bootstrap(): Promise<void> {
  config();

  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle(process.env.API_TITLE)
    .setVersion(process.env.API_VERSION)
    .setHost(
      `${process.env.HOSTNAME}${
        ['80', '443'].includes(process.env.PORT) ? '' : `:${process.env.PORT}`
      }`,
    )
    .setBasePath(process.env.API_PATH)
    .setDescription(process.env.API_DESCRIPTION)
    .setSchemes(process.env.PORT === '443' ? 'https' : 'http')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup(process.env.API_PATH, app, document);
  await app.listen(process.env.PORT, () =>
    Logger.log(`Listening on port ${process.env.PORT}...`, 'NestApplication'),
  );
}

bootstrap();
