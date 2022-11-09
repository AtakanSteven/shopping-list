import { Controller, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { MeService } from './me.service';
import { CognitoGuard } from '../auth/cognito.guard';
import { IUser } from '../common/interfaces/user.interface';

@UseGuards(CognitoGuard)
@Controller('item')
export class MeController {
  constructor(private readonly meService: MeService) {}

  @Post('/:id')
  async getMyLists(@Req() request, @Res() response) {
    const user: IUser = request.user;
    const lists = await this.meService.getMyLists(user._id);
    return response.status(HttpStatus.CREATED).json({
      lists,
    });
  }
}
