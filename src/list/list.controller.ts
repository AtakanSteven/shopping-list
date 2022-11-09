import { Body, Controller, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create.list.dto';
import { CognitoGuard } from '../auth/cognito.guard';
import { IUser } from '../common/interfaces/user.interface';

@UseGuards(CognitoGuard)
@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post()
  async createList(@Req() request, @Res() response, @Body() createListDto: CreateListDto) {
    const user: IUser = request.user;
    const newList = await this.listService.create(user._id, createListDto);
    return response.status(HttpStatus.CREATED).json({
      newList,
    });
  }
}
