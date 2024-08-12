import { IsOptional } from "class-validator";

export class CreateProfileDto {

	@IsOptional()
  bio?: string;
	
	@IsOptional()
  avatar?: string;

}
