import { Type } from "class-transformer";
import {
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested
} from "class-validator";

export class CreateAddressDto {
  
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
}