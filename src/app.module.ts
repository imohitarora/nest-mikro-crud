import { MikroOrmModule, MikroOrmModuleAsyncOptions } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BaseModule } from './base/base.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgresql',
        host: configService.get('DB_HOST'),
        port: Number(configService.get('DB_PORT')),
        user: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        dbName: configService.get('DB_DATABASE'),
        autoLoadEntities: true,
        debug: true,
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
    UserModule,
    BaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
