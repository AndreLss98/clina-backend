import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { Room } from '@prisma/client';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { RoomService } from '../../services/room/room.service';
import { BaseController } from '../base.controller';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Controller('room')
@UseGuards(JwtAuthGuard)
export class RoomController extends BaseController<Room, RoomService, CreateRoomDto, UpdateRoomDto> {
  constructor(
    protected readonly _service: RoomService
  ) {
    super(_service);
  }

  @Get()
  getAll(): Promise<Room[]> {
    return this._service.findAll()
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
    @Body() body: CreateRoomDto
  ): Promise<Room> {
    console.log(body)
    return this._service.create(body);
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
