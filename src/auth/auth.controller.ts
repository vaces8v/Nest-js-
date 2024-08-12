import { Controller, Post, Request, UseGuards, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserAuth } from './dto/userAuth.dto';
import { JwtAuthGuard } from 'src/conception/guard/jwt-auth.guard';


@ApiTags("Путь 'Авторизация JWT'")
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Вход' })
  @Post('login')
  async login(@Body() userAuth: UserAuth) {
    return this.authService.login(userAuth);
  }

  @ApiOperation({ summary: 'Обновление токена' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('refresh')
  async refresh(@Request() req) {
    return this.authService.refreshToken(req.headers.authorization.split(' ')[1]);
  }
}
