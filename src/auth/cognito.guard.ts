import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

import { CognitoService } from '../cognito/cognito.service';
import { Profile, ProfileDocument } from '../profile/schema/profile.schema';

@Injectable()
export class CognitoGuard implements CanActivate {
  constructor(
    @InjectModel(Profile.name)
    private readonly profileModel: Model<ProfileDocument>,
    private readonly cognitoService: CognitoService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authToken: string = request.headers.authorization?.split(' ')[1];

    try {
      if (authToken) {
        const result = await this.cognitoService.verifier.verify(authToken);
        const profileId = result.profile.toString();
        const email = result['email'];
        const userId = result.sub.toString();
        const profile = await this.getProfileInfoForHttpRequest(profileId);
        if (this.checkRoutesThatDoesNotRequiredProfile(request)) {
          request.user = {
            userId,
            _id: new Types.ObjectId(profileId),
            email,
            isProfileExist: !!profile,
          };

          return true;
        } else {
          if (profile) {
            const { ...rest } = profile;
            request.user = { userId, isProfileExist: true, ...rest };
            return true;
          }
          throw new UnauthorizedException();
        }
      }
      throw new UnauthorizedException();
    } catch (ex) {
      throw new UnauthorizedException();
    }
  }

  async getProfileInfoForHttpRequest(_id: string) {
    const projection = {
      email: 1,
      username: 1,
    };
    return await this.profileModel.findById(_id, projection).lean().exec();
  }

  private checkRoutesThatDoesNotRequiredProfile(request: any): boolean {
    switch (request.path) {
      case '/profiles':
        return request.method === 'POST';
      default:
        return false;
    }
  }
}
