import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUrl
} from "class-validator";

export class CreateUserDto {

  @IsNotEmpty()
  @IsString()
  name: string;
  
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @IsNotEmpty()
  @IsString()
  password: string;
  
  @IsNotEmpty()
  @IsUrl()
  avatar: string;
}