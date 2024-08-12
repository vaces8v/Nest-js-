import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePostDto {

	@ApiProperty({description: "Название"})
  @IsString()
  title: string;

	@ApiProperty({description: "Контент - текст"})
  @IsString()
  content: string;
}