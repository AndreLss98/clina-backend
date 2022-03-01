import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Request, UseGuards } from '@nestjs/common';
import { Room } from '@prisma/client';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { RoomService } from '../../services/room/room.service';
import { BaseController } from '../base.controller';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { FilterRoomDto } from './dto/filter-room.dto';

@Controller('room')
@UseGuards(JwtAuthGuard)
export class RoomController extends BaseController<Room, RoomService, CreateRoomDto, UpdateRoomDto> {
  constructor(
    protected readonly _service: RoomService
  ) {
    super(_service);
  }

  @Get()
  getAll(
    @Query()
    filters: FilterRoomDto
  ): Promise<Room[]> {
    return this._service.findAll(filters)
  }

  @Get(":id")
  getById(
    @Param("id", ParseIntPipe)
    id: number
  ): Promise<Room> {
    return this._service.getById(id);
  }

  @Post()
  create(
    @Body() body: CreateRoomDto,
    @Request()
    req
  ): Promise<Room> {
    return this._service.create(body, req.user);
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe)
    id: number,
    @Body()
    body: UpdateRoomDto
  ): Promise<Room> {
    return this._service.update(id, body);
  }

  @Delete(":id")
  delete(
    @Param("id", ParseIntPipe)
    id: number
  ): Promise<Room> {
    return this._service.delete(id);
  }
}
