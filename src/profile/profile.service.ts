import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile, ProfileDocument } from './schema/profile.schema';
import { CreateProfileDto } from './dto/create.profile.dto';
import { profileErrors } from '../common/error-messages/error-messages';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name)
    private readonly profileModel: Model<ProfileDocument>,
  ) {}

  /**
   * Create profile using email.
   *
   * Auto generated password is sent to users email.
   *
   * Checks if email already exists or not.
   *
   * NOTE: Password is not protected and its stored in our database!
   *
   * @param createProfileDto
   * @param user
   */
  // @todo protect password?
  async create(createProfileDto: CreateProfileDto, user) {
    const isUsernameExist = await this.isUsernameExist(createProfileDto.username);
    if (!isUsernameExist) {
      return await new this.profileModel({
        _id: user._id,
        email: user.email,
        username: createProfileDto.username,
      }).save();
    }
    throw new UnprocessableEntityException(profileErrors.UsernameAlreadyAcquired);
  }

  async findOne(condition) {
    return this.profileModel.findOne(condition);
  }

  private async isMailExist(email: string): Promise<boolean> {
    const exist = await this.profileModel.count({ email }).exec();
    return exist != 0;
  }

  private async isUsernameExist(username: string): Promise<boolean> {
    const exist = await this.profileModel.count({ username }).exec();
    return exist != 0;
  }
}
