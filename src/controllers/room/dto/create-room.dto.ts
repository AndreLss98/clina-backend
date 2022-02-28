import { Type } from "class-transformer";
import {
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
  IsUrl,
  IsArray,
  ArrayMinSize
} from "class-validator";

class CreateAddressDto {
  
  @IsNotEmpty()
  @IsString()
  address: string;

  @IsDefined()
  number: number;

  @IsNotEmpty()
  @IsString()
  complement: string;

  @IsNotEmpty()
  @IsString()
  district: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  cep: string;
}

class CreateRoomPhoto {

  @IsNotEmpty()
  @IsUrl()
  url: string;
}

export class CreateRoomDto {
  
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @ValidateNested()
  @IsOptional()
  @Type(() => CreateAddressDto)
  address?: CreateAddressDto;

  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => CreateRoomPhoto)
  photos: CreateRoomPhoto[];
}
