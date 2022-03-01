import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { Schedule, ScheduleAvailability } from '@prisma/client';
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
    return this._service.findAll({ roomId, availability: [ScheduleAvailability.AVAILABLE, ScheduleAvailability.RESERVED] });
  }

  @Post()
  create(
    @Body()
    body: CreateScheduleDto,
    @Request()
    req
  ): Promise<Schedule> {
    return this._service.create(body, req.user);
  }

  @Patch(":id")
  update(
    @Param('id', ParseIntPipe)
    id: number,
    @Body()
    body: UpdateScheduleDto
  ): Promise<Schedule> {
    return this._service.update(id, body);
  }

  @Delete(":id")
  delete(
    @Param('id', ParseIntPipe)
    id: number
  ): Promise<Schedule> {
    return this._service.delete(id);
  }
}
