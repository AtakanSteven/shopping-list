import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {CodeDto} from "./dto/code.dto";


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/login')
    async login(@Body() codeDto: CodeDto) {
        return await this.authService.login(codeDto);
    }

    @Post('/register')
    async register(
        @Body() registerRequest: { name: string; password: string; profileId: string },
    ) {
        return await this.authService.sendVerificationCode(registerRequest)
    }
}
