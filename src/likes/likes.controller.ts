import { Controller, Delete, Request, Get, Param, Post, UseGuards } from '@nestjs/common';
import { LikesService } from './likes.service';
import { JwtAuthGuard } from 'src/conception/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Лайки")
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @ApiOperation({summary: "Добавить"})
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post(':postId')
  async likePost(@Request() req, @Param('postId') postId: number) {
    const userId = req.user.userId;
    return this.likesService.likePost(userId, +postId);
  }

  @ApiOperation({summary: "Убрать"})
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':postId')
  async unlikePost(@Request() req, @Param('postId') postId: number) {
    const userId = req.user.userId;
    return this.likesService.unlikePost(userId, +postId);
  }

  @ApiOperation({summary: "Получить все лайки поста по id"})
  @Get(':postId/count')
  async getLikesCount(@Param('postId') postId: number) {
    return this.likesService.getLikesCount(+postId);
  }
}
