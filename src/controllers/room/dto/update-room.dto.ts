import { Type } from "class-transformer";
import {
  IsOptional,
  IsString,
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
}