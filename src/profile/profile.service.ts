import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async getMyProfile(userId: number) {
    const profile = await this.prisma.profile.findUnique({
      where: {id: userId},
    })
    return profile;
  }

  async findOne(id: number) {
    const profile = await this.prisma.profile.findUnique({
      where: {id}
    })
    return profile;
  }

 async update(id: number, createProfileDto: CreateProfileDto) {
    const update = await this.prisma.profile.update({
      where: {id},
      data: createProfileDto
    })
    return update;
  }
}
