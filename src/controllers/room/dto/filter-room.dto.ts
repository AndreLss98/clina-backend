import { ScheduleType } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { PeriodSchedule } from 'src/controllers/schedule/dto/create-schedule.dto';

export class FilterRoomDto {
  
  @IsOptional()
  id?: number;

  @IsDateString()
  @IsOptional()
  date?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsDateString()
  @IsOptional()
  fromDate?: string;

  @IsDateString()
  @ValidateIf(o => o.fromDate)
  toDate?: string;

  @IsOptional()
  @IsEnum(PeriodSchedule)
  dailyPeriod?: PeriodSchedule;
}
