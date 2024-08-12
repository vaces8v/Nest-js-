import { ApiProperty } from "@nestjs/swagger";
import {IsEmail, IsOptional, IsString } from "class-validator";

class ProfileDto {
  @ApiProperty({ description: 'Краткая информация о пользователе' })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({ description: 'Ссылка на аватар пользователя' })
  @IsOptional()
  @IsString()
  avatar?: string;
}

export class CreateUserDto {

	@ApiProperty({ description: 'Полное имя пользователя' })
	@IsString()
	name: string;

	@ApiProperty({ description: 'Email пользователя' })
	@IsEmail()
	email: string;

	@ApiProperty({ description: 'Пароль пользователя' })
	@IsString()
	password: string;

  @ApiProperty({ description: 'Профиль пользователя', type: ProfileDto }) // Указываем тип
  @IsOptional()
  profile?: ProfileDto;
}
