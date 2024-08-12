import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId, createPostDto: CreatePostDto) {
    const newPost = await this.prisma.post.create({
      data: {
        ...createPostDto,
        author: { connect: { id: userId } },
      },
    });
    return newPost;
  }

  getMyPosts(userId: number) {
    return this.prisma.post.findMany({
      where: {
        authorId: userId
      },
      select: {
        id: true,
        title: true,
        content: true,
        likes: {
          select: {
            id: true
          }
        }
      }
    }).then(posts => {
      return posts.map(post => ({
        ...post,
        likesCount: post.likes.length
      }));
    });
  }

  findAll() {
    return this.prisma.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        likes: {
          select: {
            id: true
          }
        }
      }
    }).then(posts => {
      return posts.map(post => ({
        ...post,
        likesCount: post.likes.length
      }));
    });
  }

  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({
      where: {id},
      select: {
        id: true,
        title: true,
        content: true,
        likes: {
          select: {
            id: true
          }
        }
      }
    })

    return {
      ...post,
      likesCount: post.likes.length
    }
  };

 async update(id: number, userId, updatePostDto: UpdatePostDto) {
    try{
      const post = await this.prisma.post.findUnique({
        where: { id }
      });
  
      if (!post) {
        throw new Error('Post not found');
      }
    
      if (post.authorId !== userId) {
        throw new Error('You are not allowed to update this post');
      }
    } catch(e) {
      throw new NotFoundException("Not Found")
    }
  
    return this.prisma.post.update({
      where: { id },
      data: updatePostDto
    });
  }

  async remove(id: number, userId) {
    try{
      const post = await this.prisma.post.findUnique({
        where: { id }
      });
  
      if (!post) {
        throw new Error('Post not found');
      }
    
      if (post.authorId !== userId) {
        throw new Error('You are not allowed to update this post');
      }
    } catch(e) {
      throw new NotFoundException("Not Found")
    }
  
    return this.prisma.post.delete({
      where: { id }
    });;
  }
}
