import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {ConfigModule, ConfigService} from "@nestjs/config";
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
      ConfigModule.forRoot({
          isGlobal: true,
      }),
      MongooseModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService): Promise<{uri: string | undefined}> => ({
              uri: configService.get<string>('MONGODB_URI'),
          }),
      }),
      UsersModule,
      AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
