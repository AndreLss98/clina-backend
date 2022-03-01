import { ScheduleAvailability } from "@prisma/client";
import { IsEnum, IsOptional } from "class-validator";

export class FilterScheduleDto {

  @IsOptional()
  roomId?: number;

  @IsOptional()
  @IsEnum(ScheduleAvailability)
  availability?: ScheduleAvailability[];
}