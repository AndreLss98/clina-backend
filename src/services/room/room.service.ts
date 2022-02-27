import { Injectable } from '@nestjs/common';
import { BaseService } from '../base.service';

import { Room } from '@prisma/client';

import { CreateRoomDto } from '../../controllers/room/dto/create-room.dto';
import { UpdateRoomDto } from '../../controllers/room/dto/update-room.dto';
import { PrismaService } from '../../database/prisma/prisma.service';

@Injectable()
export class RoomService extends BaseService<Room, CreateRoomDto, UpdateRoomDto> {
  constructor(
    protected prisma: PrismaService
  ) {
    super(prisma);
    this._repo = prisma.room;
  }

  getById(id: number): Promise<Room> {
    return this._repo.findUnique({
      where: { id },
      include: {
        address: true
      }
    });
  };

  create(body: CreateRoomDto): Promise<Room> {
    const { address, ...room } = body;
    
    return this._repo.create({  
      data: {
        ...room,
        address: {
          create: address
        }
      }
    });
  }

  update(id: number, body: UpdateRoomDto): Promise<Room> {
    const { address, ...room } = body;

    return this._repo.update({
      where: { id },
      data: {
        ...room,
        address: {
          update: address
        }
      }
    });
  }
}
