import {Body, Controller, HttpStatus, Param, Post, Req, Res, UseGuards} from "@nestjs/common";
import {ItemService} from "./item.service";
import {AuthGuard} from "@nestjs/passport";
import {CreateItemDto} from "./dto/create.item.dto";

@Controller('item')
export class ItemController {
    constructor(private readonly ItemService: ItemService){}

    @UseGuards(AuthGuard('jwt'))
    @Post("/list/:listId")
    async createItem(@Req() req, @Param("listId") listId, @Res() response, @Body() createItemDto: CreateItemDto, @Param() param) {
        console.log("reqreq", req)
        const user = req.user.id
        const newItem = await this.ItemService.createItem(user, listId, createItemDto);
        return response.status(HttpStatus.CREATED).json({
            newItem
        })
    }
}
