import { PartialType } from '@nestjs/swagger';
import { CreateProfileDto } from './create-profile.dto';
import { IsOptional } from 'class-validator';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
	
	@IsOptional()
  bio?: string;

	@IsOptional()
  avatar?: string;

}
