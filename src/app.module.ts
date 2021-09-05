import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BaseModule } from './base/base.module';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: 'postgres',
      dbName: 'allio',
      type: 'postgresql',
      autoLoadEntities: true,
      debug: true,
    }),
    UserModule,
    BaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
