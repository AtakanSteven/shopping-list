import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailModule } from '../mail/email.module';
import { RequestSchema, Request } from './schema/request.schema';
import { RequestController } from './request.controller';

import { RequestService } from './request.service';
import { RequestRepository } from './request.repository';
import { ListModule } from '../list/list.module';
import { Profile, ProfileSchema } from '../profile/schema/profile.schema';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [RequestService, RequestRepository, JwtService],
  controllers: [RequestController],
  imports: [
    MongooseModule.forFeature([
      { name: Request.name, schema: RequestSchema },
      { name: Profile.name, schema: ProfileSchema },
    ]),
    EmailModule,
    ListModule,
  ],
  exports: [RequestService],
})
export class RequestModule {}
