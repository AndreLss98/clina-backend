import {
  IsDate,
  IsDateString,
  IsDefined,
  IsEnum
} from "class-validator";

export enum PeriodSchedule {
  MORNING = "MORNING",
  AFTERNOON = "AFTERNOON",
  NIGHT = "NIGHT"
}

export class CreateScheduleDto {
  
  @IsDefined()
  @IsEnum(PeriodSchedule)
  period: PeriodSchedule;

  @IsDateString()
  fromDate: string;
  
  @IsDateString()
  toDate: string;

  @IsDefined()
  roomId: number;
}
