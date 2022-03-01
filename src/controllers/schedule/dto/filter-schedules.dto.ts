import { IsOptional } from "class-validator";

export class FilterScheduleDto {

  @IsOptional()
  roomId: number;
}