import { Type } from "class-transformer";
import {
  ArrayMinSize,
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested
} from "class-validator";

export class UpdateAddressDto {
  
  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  number: number;

  @IsOptional()
  @IsString()
  complement: string;

  @IsOptional()
  @IsString()
  district: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  state: string;

  @IsOptional()
  @IsString()
  cep: string;
}

class UpdateRoomPhoto {

  @IsOptional()
  id: number; 

  @IsNotEmpty()
  @IsUrl()
  url: string;
}

export class UpdateRoomDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @ValidateNested()
  @IsOptional()
  @Type(() => UpdateAddressDto)
  address?: UpdateAddressDto;

  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => UpdateRoomPhoto)
  photos: UpdateRoomPhoto[];
}