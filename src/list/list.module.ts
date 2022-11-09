import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailModule } from '../mail/email.module';
import { List, ListSchema } from './schema/list.schema';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { ListRepository } from './list.repository';
import { Profile, ProfileSchema } from '../profile/schema/profile.schema';

@Module({
  providers: [ListService, ListRepository],
  controllers: [ListController],
  imports: [
    MongooseModule.forFeature([
      { name: List.name, schema: ListSchema },
      { name: Profile.name, schema: ProfileSchema },
    ]),
    EmailModule,
  ],
  exports: [ListService],
})
export class ListModule {}
