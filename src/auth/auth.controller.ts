import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CodeDto } from './dto/code.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Res() response, @Body() codeDto: CodeDto) {
    const login = await this.authService.login(codeDto);
    return response.status(HttpStatus.CREATED).json({
      login,
    });
  }

  @Post('/register')
  async register(@Res() response, @Body() authDto: AuthDto) {
    const register = await this.authService.sendVerificationCode(authDto);
    return response.status(HttpStatus.CREATED).json({
      register,
    });
  }
}
