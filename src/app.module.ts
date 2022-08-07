import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileModule } from './profile/profile.module';
import { ConfigModule } from '@nestjs/config';
import getDatabaseUrl from './config/database.url';
import { EmailModule } from './mail/email.module';
import { AuthModule } from './auth/auth.module';
import { ListModule } from './list/list.module';
import { ItemModule } from './item/item.module';
import { AuthConfig } from './auth/auth.config';
import { CognitoModule } from './cognito/cognito.module';
import { RequestModule } from './requests/request.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(getDatabaseUrl()),
    ProfileModule,
    RequestModule,
    EmailModule,
    ListModule,
    ItemModule,
    AuthModule,
    CognitoModule,
    AuthConfig,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
