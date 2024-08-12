import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserAuth } from './dto/userAuth.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
	constructor(private jwtService: JwtService, private readonly prisma: PrismaService) {}

  async login(userAuth: UserAuth) {
    const userExist = await this.prisma.user.findUnique({
      where: { email: userAuth.email }
    });
  
    if (!userExist) throw new NotFoundException("Неверный логин или пароль");
  
    if (userAuth.password !== userExist.password) {
      throw new BadRequestException("Неверный логин или пароль");
    }
  
    const payload = { username: userExist.name, sub: userExist.id };
  
    const expiration = userAuth.remember ? '1y' : '2h';
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: expiration }),
    };
  }

  async refreshToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      return {
        access_token: this.jwtService.sign({ username: payload.username, sub: payload.sub }),
      };
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token has expired, please log in again.'); 
      }
      throw new UnauthorizedException('Invalid token.');
    }
  }
}
