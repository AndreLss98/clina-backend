import { Injectable } from '@nestjs/common';
import { User, PrismaClient } from '@prisma/client';

import { CreateUserDto } from 'src/controllers/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/controllers/user/dto/update-user.dto';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { BaseService } from '../base.service';

@Injectable()
export class UserService extends BaseService<User, CreateUserDto, UpdateUserDto> {
  private readonly _repo: PrismaClient['user'];
  constructor(
    protected prisma: PrismaService
  ) {
    super(prisma);
    this._repo = prisma.user;
  }

  findAll(): Promise<User[]> {
    return this._repo.findMany();
  }
  getById(id: number): Promise<User> {
    return this._repo.findFirst({
      where: { id: Number(id) }
    });
  }
  create(body: CreateUserDto): Promise<User> {
    return this._repo.create({
      data: body
    });
  }
  update(id: number, body: UpdateUserDto): Promise<User> {
    return this._repo.update({
      where: { id: Number(id) },
      data: body
    });
  }

}
