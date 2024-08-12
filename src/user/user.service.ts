import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {

    const exsitUser = await this.prisma.user.findUnique({
      where: {email: createUserDto.email}
    })

    if(exsitUser) throw new BadRequestException("Такой email уже существует")
    
    const {profile, ...userData} = createUserDto;

    const newUser = await this.prisma.user.create({
      data: {
        ...userData,
        profile: {
          create: profile || {}
        }
      },
      select: {
        id: true,
        name: true,
        email: true,
        profile: true
      }
    }
  );

  return newUser;
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        profileId: true,
        posts: {
          select: {
            id: true
          }
        }
      }
    });

    return users.map(user => ({
      ...user,
      posts: user.posts.map(post => post.id)
    }));
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {id},
      select: {
        id: true,
        name: true,
        email: true,
        profileId: true,
        posts: true
      }
    })

    if(!user) throw new NotFoundException("Пользователь с не найден")

    return {...user, posts: user.posts.map(post => post.id)};
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const {profile, ...userData} = updateUserDto;

    const user = await this.prisma.user.update({
      where: {id},
      data: {
        ...userData,
        profile: {
          create: profile
        }
      }
    })

    if(!user) throw new NotFoundException("Пользователь с не найден")

    return {message: "Пользователь обновлен!", data: user};
  }

  async remove(id: number) {
    const user = await this.prisma.user.delete({
      where: {id},
    })

    if(!user) throw new NotFoundException("")

    return `Пользователь ${user.name} удален!`;
  }
}

