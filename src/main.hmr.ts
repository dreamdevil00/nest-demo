import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import * as path from 'path';

declare const module: any;

// const { description } = require(path.join(__dirname, '../package.json'));

const apiVersion = 'v1';
const apiMountPath = '/api';
const apiExplorerPath = '/explorer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('NestDemo')
    .setDescription('API Description')
    .setVersion(apiVersion)
    .addTag('NestDemoApi', 'test')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(apiExplorerPath, app, document);
  app.setGlobalPrefix(`${apiMountPath}/${apiVersion}`);

  await app.listen(3000, () => {
    console.log(`Server listening at port 3000`);
  });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
