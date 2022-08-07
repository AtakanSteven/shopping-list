import { Module } from '@nestjs/common';
import { Profile, ProfileSchema } from './schema/profile.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { EmailModule } from '../mail/email.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [ProfileService, JwtService],
  controllers: [ProfileController],
  imports: [MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }]), EmailModule],
  exports: [ProfileService],
})
export class ProfileModule {}
