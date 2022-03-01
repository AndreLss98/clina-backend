import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { Schedule } from '@prisma/client';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { ScheduleService } from '../../services/schedule/schedule.service';
import { BaseController } from '../base.controller';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

@Controller('schedule')
@UseGuards(JwtAuthGuard)
export class ScheduleController extends BaseController<
  Schedule,
  ScheduleService,
  CreateScheduleDto,
  UpdateScheduleDto
> {
  constructor(
    protected readonly _service: ScheduleService
  ) {
    super(_service);
  }

  @Get()
  getAll(): Promise<Schedule[]> {
    return this._service.findAll();
  }

  @Get(":roomId")
  getByRoomId(
    @Param('roomId', ParseIntPipe)
    roomId: number
  ): Promise<Schedule[]> {
    return this._service.findAll({ roomId });
  }

  @Post()
  create(
    @Body()
    body: CreateScheduleDto
  ): Promise<Schedule> {
    return this._service.create(body);
  }

  @Patch(":id")
  update(
    @Param('id', ParseIntPipe)
    id: number,
    @Body()
    body: UpdateScheduleDto
  ): Promise<Schedule> {
    throw new Error('Method not implemented.');
  }

  @Delete(":id")
  delete(
    @Param('id', ParseIntPipe)
    id: number
  ): Promise<Schedule> {
    throw new Error('Method not implemented.');
  }
}
