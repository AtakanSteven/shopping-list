import {Body, Controller, HttpStatus, Param, Post, Req, Res, UseGuards} from "@nestjs/common";
import { ListService } from "./list.service";
import { CreateListDto } from "./dto/create.list.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller('list')
export class ListController {
    constructor(private readonly ListService: ListService){}

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async createList(@Req() req, @Res() response, @Body() createListDto: CreateListDto, @Param() param) {
        console.log("reqreq", req)
        const user = req.user.id
        const newList = await this.ListService.create(user, createListDto);
        return response.status(HttpStatus.CREATED).json({
            newList
        })
    }

}
