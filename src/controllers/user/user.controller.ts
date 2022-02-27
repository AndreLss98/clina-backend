import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards} from '@nestjs/common';
import { BaseController } from '../base.controller';

import { User } from '@prisma/client';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from '../../services/user/user.service';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';

@Controller('user')
export class UserController extends BaseController<User, UserService, CreateUserDto, UpdateUserDto> {
  constructor(
    protected readonly _service: UserService
  ) {
    super(_service);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getAll(): Promise<User[]> {
    return this._service.findAll();
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  async getById(
    @Param("id", ParseIntPipe)
    id: number
  ): Promise<User> {
    return this._service.getById(id);
  }

  @Post()
  async create(@Body() body: CreateUserDto): Promise<User> {
    return this._service.create(body);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  async update(
    @Param("id", ParseIntPipe)
    id: number,
    @Body()
    body: UpdateUserDto
  ): Promise<User> {
    return this._service.update(id, body);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  delete(@Param("id", ParseIntPipe) id: number): Promise<User> {
    return this._service.delete(id);
  }
}
