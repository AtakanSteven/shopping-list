import { Body, Controller, HttpStatus, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ItemService } from './item.service';
import { CognitoGuard } from '../auth/cognito.guard';
import { AddItemToListDto } from './dto/add.item.to.list.dto';
import { MongoIdParam } from '../helper/isMongoId/isMongoId';
import { IUser } from '../common/interfaces/user.interface';

@UseGuards(CognitoGuard)
@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post('/:id')
  async createItem(@Req() request, @Param() param: MongoIdParam, @Res() response, @Body() addItemDto: AddItemToListDto) {
    const user: IUser = request.user;
    const newItem = await this.itemService.createItem(user._id, param.id, addItemDto);
    return response.status(HttpStatus.CREATED).json({
      newItem,
    });
  }
}
