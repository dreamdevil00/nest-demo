import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import * as path from 'path';
import { ValidationPipe } from '@nestjs/common';

import * as csurf from 'csurf';
import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
import * as compression from 'compression';

import {
  apiExplorerPath,
  apiMountPath,
  apiVersion,
  isProduction,
  host,
  port,
} from '../config';

const cookieSession = require('cookie-session');
const { description } = require(path.join(__dirname, '../package.json'));

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(compression());
  // 开启 跨源资源共享
  app.enableCors();
  app.use(helmet());
  app.use(
    cookieSession({
      secret: 'juiw;fnbmpxn',
      httpOnly: true,
    }),
  );
  app.use(csurf());
  app.use(
    new rateLimit({
      windowMs: 15 * 60 * 1000, // 15 分钟
      max: 100, // 时间窗内每个 IP 最多请求 100 次
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      // 生产环境下 关闭错误信息
      disableErrorMessages: isProduction,
      // 移除 DTO 中不存在的属性
      whitelist: true,
      // 将 payload 自动转换成 对应 DTO 类的实例
      transform: true,
    }),
  );

  const apiBasePath = `${apiMountPath}/${apiVersion}`;
  app.setGlobalPrefix(apiBasePath);
  // 配置 API 文档
  const options = new DocumentBuilder()
    .setTitle('NestDemoTitle')
    .setDescription('API Description')
    .setBasePath(apiBasePath)
    .setVersion(apiVersion)
    .addTag('NestDemoApiTag', description)
    .addBearerAuth('access_token', 'query')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(apiExplorerPath, app, document);

  await app.listen(port, host, () => {
    console.log(`Server listening at ${host}:${port}`);
  });
}

bootstrap();
