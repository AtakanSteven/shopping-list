import { Controller, HttpStatus, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { RequestService } from './request.service';
import { CognitoGuard } from '../auth/cognito.guard';
import { MongoIdParam } from '../helper/isMongoId/isMongoId';

@UseGuards(CognitoGuard)
@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post('/list/:id')
  async joinListRequest(@Req() request, @Res() response, @Param() param: MongoIdParam) {
    const user = request.user;
    const joinRequest = await this.requestService.joinListRequest(user, param.id);
    return response.status(HttpStatus.CREATED).json({
      joinRequest,
    });
  }
}
