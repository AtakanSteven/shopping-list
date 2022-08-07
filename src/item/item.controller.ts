import { Body, Controller, HttpStatus, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ItemService } from './item.service';
import { CognitoGuard } from '../auth/cognito.guard';
import { AddItemToListDto } from './dto/add.item.to.list.dto';

@UseGuards(CognitoGuard)
@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post('/:listId')
  async createItem(@Req() request, @Param() param, @Res() response, @Body() addItemDto: AddItemToListDto) {
    const user = request.user;
    const newItem = await this.itemService.createItem(user, param.listId, addItemDto);
    return response.status(HttpStatus.CREATED).json({
      newItem,
    });
  }
}
