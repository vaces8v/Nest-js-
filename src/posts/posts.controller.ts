import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/conception/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Посты")
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({summary: "Создать"})
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  create(@Request() req ,@Body() createPostDto: CreatePostDto) {
    const userId = req.user.userId;
    return this.postsService.create(userId, createPostDto);
  }

  @ApiOperation({summary: "Получить все мои посты"})
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('my')
  getMyPosts(@Request() req) {
    const userId = req.user.userId;
    return this.postsService.getMyPosts(userId);
  }

  @ApiOperation({summary: "Получить все"})
  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @ApiOperation({summary: "Получить по id"})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @ApiOperation({summary: "Обновить по id"})
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Request() req, @Body() updatePostDto: UpdatePostDto) {
    const userId = req.user.userId;
    return this.postsService.update(+id, userId, updatePostDto);
  }

  @ApiOperation({summary: "Удалить по id"})
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.userId;
    return this.postsService.remove(+id, userId);
  }
}
