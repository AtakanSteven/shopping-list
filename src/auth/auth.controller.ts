import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {CodeDto} from "./dto/code.dto";


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/login')
    async login(@Body() codeDto: CodeDto) {
        try {
            return await this.authService.login(codeDto);
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    @Post('/register')
    async register(
        @Body() registerRequest: { name: string; password: string; profileId: string },
    ) {
        return await this.authService.sendVerificationCode(registerRequest)
    }
}
