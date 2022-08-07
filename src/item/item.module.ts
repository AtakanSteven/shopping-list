import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailModule } from '../mail/email.module';
import { ItemSchema, Item } from './schema/item.schema';
import { ItemController } from './item.controller';

import { ItemService } from './item.service';
import { ItemRepository } from './item.repository';
import { ListModule } from '../list/list.module';
import { Profile, ProfileSchema } from '../profile/schema/profile.schema';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [ItemService, ItemRepository, JwtService],
  controllers: [ItemController],
  imports: [
    MongooseModule.forFeature([
      { name: Item.name, schema: ItemSchema },
      { name: Profile.name, schema: ProfileSchema },
    ]),
    EmailModule,
    ListModule,
  ],
  exports: [ItemService],
})
export class ItemModule {}
