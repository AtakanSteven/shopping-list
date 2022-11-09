import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MeController } from './me.controller';

import { MeService } from './me.service';
import { MeRepository } from './me.repository';
import { Profile, ProfileSchema } from '../profile/schema/profile.schema';
import { ListModule } from '../list/list.module';

@Module({
  providers: [MeService, MeRepository],
  controllers: [MeController],
  imports: [MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }]), ListModule],
  exports: [MeService],
})
export class MeModule {}
