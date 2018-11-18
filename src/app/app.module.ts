import { Module, CacheModule, CacheInterceptor } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsModule } from './cats/cats.module';
import { UserModule } from './user/user.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { mysql } from '../../config';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: mysql.host,
      port: mysql.port,
      username: mysql.username,
      password: mysql.password,
      database: mysql.database,
      entities: [__dirname + '/**/*.entity{.ts, .js}'],
      synchronize: true,
    }),
    CacheModule.register(),
    CatsModule,
    //   UserModule,
    // AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // 全局缓存： 只有 GET 操作才会被缓存
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
