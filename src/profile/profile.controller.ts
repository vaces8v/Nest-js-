import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/conception/guard/jwt-auth.guard';
import { CreateProfileDto } from './dto/create-profile.dto';

@ApiTags("Профиль")
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiOperation({summary: "Получить мой профиль"})
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  getMyProfile(@Request() req) {
    const userId = req.user.userId;
    return this.profileService.getMyProfile(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() createProfileDto: CreateProfileDto) {
    return this.profileService.update(+id, createProfileDto);
  }
}
