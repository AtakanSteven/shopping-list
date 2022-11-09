import { Body, Controller, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create.profile.dto';
import { CognitoGuard } from '../auth/cognito.guard';
import { IUser } from '../common/interfaces/user.interface';

@UseGuards(CognitoGuard)
@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  async createProfile(@Req() request, @Res() response, @Body() createProfileDto: CreateProfileDto) {
    const user: IUser = request.user;
    const newProfile = await this.profileService.create(createProfileDto, user);
    return response.status(HttpStatus.CREATED).json({
      newProfile,
    });
  }
}
