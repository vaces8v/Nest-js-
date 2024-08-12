import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsString } from "class-validator";

export class UserAuth {

	@ApiProperty({description: 'Почта'})
	@IsEmail()
	email: string;

	@ApiProperty({description: 'Пароль'})
	@IsString()
	password: string;

	@ApiProperty({description: 'Запомнить меня'})
	@IsBoolean()
  remember: boolean;
}