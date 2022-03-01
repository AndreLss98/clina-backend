import { Module } from '@nestjs/common';
import { RoomService } from '../../services/room/room.service';
import { PrismaService } from '../../database/prisma/prisma.service';
import { RoomController } from './room.controller';

@Module({
  controllers: [RoomController],
  providers: [RoomService, PrismaService],
  exports: [RoomService]
})
export class RoomModule {}
