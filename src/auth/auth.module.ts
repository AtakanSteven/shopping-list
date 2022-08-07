import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Code, CodeSchema } from './schema/code.schema';
import { CognitoModule } from '../cognito/cognito.module';
import { Profile, ProfileSchema } from '../profile/schema/profile.schema';
import { EmailModule } from '../mail/email.module';

@Module({
  imports: [
    CognitoModule,
    EmailModule,
    MongooseModule.forFeature([
      { name: Code.name, schema: CodeSchema },
      { name: Profile.name, schema: ProfileSchema },
    ]),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
